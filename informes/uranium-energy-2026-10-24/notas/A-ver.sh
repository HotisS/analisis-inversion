#!/bin/bash
# uso: A-ver.sh archivo desde hasta  -> compacta tablas verticales de EDGAR
sed -n "$2,$3p" "$1" | sed 's/\xe2\x80\x8b//g' | awk '{gsub(/^[ \t]+|[ \t]+$/,""); if($0=="")next; if(length($0)>200){print "\n"substr($0,1,1200); next} printf "%s ", $0} END{print ""}' | sed 's/\$ /$/g; s/( /(/g; s/ )/)/g'
