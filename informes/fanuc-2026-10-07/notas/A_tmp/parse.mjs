import fs from 'fs';
const items = {
 ventas:/^Net sales\s/, cogs:/^Cost of (goods sold|sales)/, sga:/^Selling, general/, ebit:/^Operating income\s/,
 int_inc:/^Interest income/, div_inc:/^Dividends? income/, equity:/^Equity in earnings of affil/, fx_gain:/^Foreign exchange gains?/, fx_loss:/^Foreign exchange loss/,
 int_exp:/^Interest expenses?/, noi:/^Total non-operating income/, noe:/^Total non-operating expenses/, ord:/^Ordinary income\s/,
 xinc:/^Total extraordinary income/, xloss:/^Total extraordinary loss/, bai:/^Income before income taxes/, tax:/^Total taxes and others/,
 nci:/^Net income attributable to non/, ni:/^Net income attributable to owners/,
 cash:/^Cash and (bank )?deposits/, notes_rec:/^Notes receivables?, trade/, ar:/^Accounts receivable/, notes_ar:/^Notes and accounts receivable/, mkt:/^Marketable securities|^Securities\s/, fg:/^Merchandise and finished|^Finished goods/, wip:/^Work in process|^Work in progress/, raw:/^Raw materials/,
 tca:/^Total current assets/, ppe:/^Total property, plant|^Property, plant and equipment, net/, intang:/^Intangible assets|^Total intangible/, invsec:/^Investment securities/, ta:/^Total assets\s/,
 ap:/^Notes and accounts payables?|^Accounts payable/, lease_c:/^Lease obligations/, tcl:/^Total current liabilities/, tl:/^Total liabilities\s/,
 re:/^Retained earnings/, treas:/^Treasury stock/, ncieq:/^Non-controlling interests\s/, tna:/^Total net assets\s/, shares_eq:/^Total shareholders/,
 da:/^Depreciation and amortization/, cfo:/^Net cash provided by (\(used in\) )?operating/, capex:/^Purchases? of property|^Purchase of tangible/, capex_i:/^Purchases? of intangible/, buyback:/^Purchases? of treasury/, divs:/^Dividends paid\s|^Cash dividends paid/, divs_nci:/^Dividends paid to non/, cash_end:/^Cash and cash equivalents at end/, cfi:/^Net cash (used in|provided by) investing/, tdep_in:/^Payments into time deposits/, tdep_out:/^Proceeds from withdrawal of time/, inv_buy:/^Purchases? of (investment|marketable)/,
 tax_paid:/^Income taxes paid/, intdiv_rec:/^Interest and dividends received/,
};
const CF = new Set(['da','cfo','capex','capex_i','buyback','divs','divs_nci','cash_end','cfi','tdep_in','tdep_out','inv_buy','tax_paid','intdiv_rec']);
const num = s => { const neg=/^\(.*\)$/.test(s); const v=Number(s.replace(/[(),]/g,'')); return neg?-v:v; };
const out={};
for (const y of process.argv.slice(2)) {
  const all = fs.readFileSync('A_tmp/t'+y+'.txt','utf8').split('\n').map(l=>l.trim());
  const cfi = all.findIndex(l=>/Statements? of Cash Flows/.test(l));
  const r={};
  for (const [k,re] of Object.entries(items)) {
    const lines = CF.has(k) ? all.slice(cfi) : all;
    for (let i=0;i<lines.length;i++){ const l=lines[i]; if(!re.test(l)) continue;
      let toks=(l.match(/\(?[\d,]+\)?(?=\s|$)/g)||[]).map(t=>t.trim()).filter(t=>t.replace(/\D/g,'').length>=2);
      if(toks.length>=2){ r[k]=[num(toks[toks.length-2]),num(toks[toks.length-1])]; break; }
      if(toks.length==1 && !r[k]) r[k]=[null,num(toks[0])];
    }
  }
  out['FY20'+y]=r;
}
fs.writeFileSync('A_tmp/parsed.json',JSON.stringify(out,null,1));
