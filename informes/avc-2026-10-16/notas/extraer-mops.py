# Extrae de las respuestas de la API de MOPS (notas/docs/mops/*.json: t164sb03 balance, t164sb04 cuenta, t164sb05 flujos)
# las series anuales y trimestrales de AVC (3017) en millones de TWD y las deja en notas/cuentas-mops.json.
# Las cifras reexpresadas más recientes sustituyen a las antiguas (los archivos se leen por orden de periodo).
# Uso: python3 -I notas/extraer-mops.py
import json, glob, os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'docs', 'mops')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cuentas-mops.json')

def num(s):
    s = (s or '').replace(',', '').strip()
    try:
        return float(s) if s not in ('', '-') else None
    except ValueError:
        return None

data = {}
for f in sorted(glob.glob(D + '/*.json')):
    try:
        j = json.load(open(f, encoding='utf8'))
    except Exception:
        continue
    if j.get('code') != 200:
        continue
    tipo = os.path.basename(f).split('_')[0]
    r = j['result']
    titles = [t['main'] for t in r['titles']][1:]
    step = 2 if tipo in ('t164sb03', 't164sb04') else 1
    for row in r['reportList']:
        lab = row[0].strip().replace('／', '∕')
        for i, t in enumerate(titles):
            idx = 1 + i * step
            v = num(row[idx]) if idx < len(row) else None
            d = data.setdefault(tipo + '|' + t, {})
            if v is not None or lab not in d:
                d[lab] = v

M = lambda v: None if v is None else round(v / 1000)
I = lambda k, l: data.get('t164sb04|' + k, {}).get(l)
C = lambda k, l: data.get('t164sb05|' + k, {}).get(l) or 0
B = lambda k, l: data.get('t164sb03|' + k, {}).get(l) or 0
NI, MI = '母公司業主（淨利∕損）', '非控制權益（淨利∕損）'
DPA = {'109': 2.8, '110': 4.3, '111': 5.0, '112': 6.96, '113': 9.93, '114': 20.88}

cuenta, balance, flujos = [], [], []
for y in ['109', '110', '111', '112', '113', '114']:
    k = f'{y}年度'
    per = str(int(y) + 1911)
    ebit, pbt = I(k, '營業利益（損失）'), I(k, '稅前淨利（淨損）')
    am = C(k, '折舊費用') + C(k, '攤銷費用')
    ni, eps = I(k, NI), I(k, '稀釋每股盈餘')
    cuenta.append(dict(periodo=per, ingresos=M(I(k, '營業收入合計')), coste_ventas=M(I(k, '營業成本合計')),
        gastos_generales=M(I(k, '推銷費用') + I(k, '管理費用')), ebitda=M(ebit + am), amortizaciones=M(am), ebit=M(ebit),
        resultado_financiero=M(pbt - ebit), bai=M(pbt), impuestos=M(I(k, '所得稅費用（利益）合計')), minoritarios=M(I(k, MI)),
        beneficio_neto=M(ni), gastos_financieros=M(I(k, '財務成本淨額')), participadas_en_ebitda=None, no_recurrentes_en_ebitda=None,
        bpa=eps, dpa=DPA[y], dpa_extraordinario=0, acciones_diluidas=round(ni / 1000 / eps, 1),
        _id=M(I(k, '研究發展費用')), _bpa_basico=I(k, '基本每股盈餘')))
    kb = f'{y}年12月31日'
    g = lambda l: B(kb, l)
    balance.append(dict(periodo=per, activo_total=M(g('資產總額')), activo_corriente=M(g('流動資產合計')), pasivo_corriente=M(g('流動負債合計')),
        pasivo_total=M(g('負債總額')), fondo_comercio=None, intangibles=M(g('無形資產')), inmovilizado_material=M(g('不動產、廠房及設備')),
        existencias=M(g('存貨')), clientes=M(g('應收帳款淨額') + g('應收票據淨額')), proveedores=M(g('應付帳款') + g('應付票據')),
        activos_contrato=None, pasivos_contrato=None, caja=M(g('現金及約當現金') + g('按攤銷後成本衡量之金融資產－流動')),
        deuda_financiera=M(g('短期借款') + g('應付短期票券') + g('長期借款') + g('應付公司債')),
        arrendamientos=M(g('租賃負債－流動') + g('租賃負債－非流動')), patrimonio_neto=M(g('歸屬於母公司業主之權益合計')),
        minoritarios=M(g('非控制權益')), reservas=M(g('保留盈餘合計'))))
    capex = -(C(k, '取得不動產、廠房及設備') + C(k, '取得無形資產') + C(k, '取得使用權資產') + min(C(k, '其他非流動資產增加'), 0))
    flujos.append(dict(periodo=per, flujo_operativo=M(C(k, '營業活動之淨現金流入（流出）')), capex=M(capex),
        pagos_arrendamientos=M(-C(k, '租賃本金償還')), adquisiciones=0,
        desinversiones=M(C(k, '處分不動產、廠房及設備') + C(k, '處分採用權益法之投資')), dividendos=M(-C(k, '發放現金股利')), recompras=0,
        emision_acciones=M(C(k, '現金增資') + C(k, '員工執行認股權')), intereses_en_financiacion=0,
        _ppe=M(-C(k, '取得不動產、廠房及設備')), _otros_no_corrientes=M(-C(k, '其他非流動資產增加'))))

def ytd(y, q):
    return f'{y}年度' if q == 4 else f'{y}年01月01日至{y}年' + {1: '03月31日', 2: '06月30日', 3: '09月30日'}[q]

trimestres = []
labs = ['營業收入合計', '營業成本合計', '營業利益（損失）', NI, MI, '稅前淨利（淨損）']
for y in ['112', '113', '114', '115']:
    prev = {l: 0 for l in labs}; prev_da = 0; prev_eps = 0
    for q in [1, 2, 3, 4]:
        k = ytd(y, q)
        if 't164sb04|' + k not in data:
            continue
        cur = {l: I(k, l) or 0 for l in labs}
        da = C(k, '折舊費用') + C(k, '攤銷費用')
        eps_ytd = I(k, '稀釋每股盈餘')
        trimestres.append(dict(periodo=f'{q}T{y[1:] if False else str(int(y)+1911)[2:]}',
            ingresos=M(cur['營業收入合計'] - prev['營業收入合計']), coste=M(cur['營業成本合計'] - prev['營業成本合計']),
            ebit=M(cur['營業利益（損失）'] - prev['營業利益（損失）']), da=M(da - prev_da),
            beneficio_neto=M(cur[NI] - prev[NI]), minoritarios=M(cur[MI] - prev[MI]), bpa=round(eps_ytd - prev_eps, 2)))
        prev, prev_da, prev_eps = cur, da, eps_ytd

json.dump(dict(cuenta=cuenta, balance=balance, flujos=flujos, trimestres=trimestres,
               balance_2T26={l: M(v) for l, v in data['t164sb03|115年06月30日'].items()},
               flujos_1S26={l: M(v) for l, v in data['t164sb05|115年01月01日至115年06月30日'].items()},
               flujos_1S25={l: M(v) for l, v in data['t164sb05|114年01月01日至114年06月30日'].items()}),
          open(OUT, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
for k in ('cuenta', 'balance', 'flujos', 'trimestres'):
    for r in locals()[k]:
        print(k, r)
