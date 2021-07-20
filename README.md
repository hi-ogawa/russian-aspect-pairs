List of Russian verb aspect pairs (видовые пары)

```bash
# Download Universal Dependencies dataset
wget -c -P data/conllu https://github.com/UniversalDependencies/UD_Russian-Taiga/raw/r2.8/ru_taiga-ud-train.conllu
wget -c -P data/conllu https://github.com/UniversalDependencies/UD_Russian-Taiga/raw/r2.8/ru_taiga-ud-dev.conllu
wget -c -P data/conllu https://github.com/UniversalDependencies/UD_Russian-Taiga/raw/r2.8/ru_taiga-ud-test.conllu
wget -c -P data/conllu https://github.com/UniversalDependencies/UD_Russian-SynTagRus/raw/r2.8/ru_syntagrus-ud-train.conllu
wget -c -P data/conllu https://github.com/UniversalDependencies/UD_Russian-SynTagRus/raw/r2.8/ru_syntagrus-ud-dev.conllu
wget -c -P data/conllu https://github.com/UniversalDependencies/UD_Russian-SynTagRus/raw/r2.8/ru_syntagrus-ud-test.conllu

# Extract verbs (lemma) from dataset
grep -P "\tVERB\t" data/conllu/*.conllu | cut -f 3 | sort -u > data/verbs.txt

# Scrape gramoto.ru entry for each verb
xargs -a data/verbs.txt -L 10 node build/scrape.js > data/verbs-scrape.ndjson
```

References

- [Universal dependencies](https://universaldependencies.org)
  - [.conllu format](https://universaldependencies.org/format.html)
  - [Russian dataset](https://universaldependencies.org/ru/index.html)
- [Gramota.ru (Прамота.ру)](http://gramota.ru)
- [About aspect pairs (https://russkiiyazyk.ru)](https://russkiiyazyk.ru/chasti-rechi/glagol/vidovye-pary-glagolov.html)
