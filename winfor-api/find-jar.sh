#!/bin/bash


#set -x
set -euo pipefail

pom_file_basename=${1:-pom.xml}
maven_cache_dir=~/.m2/repository

get_classes_from_pom() {
	initial_dir=$(pwd);

	# encontrar um arquivo pom.xml, no diretório atual ou então no parent até '/'
	root_was_reached=false
	current_dir=$(pwd)
	while [ ! -e "$pom_file_basename" ]; do
		if [ "$current_dir" == "/" ]; then
			echo "${pom_file_basename}: file not found" >&2;
			exit 1;
		fi;
		cd ..
		current_dir=$(pwd)
	done;

	# calcular um hash do arquivo pom.xml encontrado
	pom_contents=$(cat ${pom_file_basename});
	pom_xml_hash=$(sha1sum ${pom_file_basename} | awk '{print $1}');
	pom_cache_file="/tmp/${pom_xml_hash}-findclass.gzip";

	# validar que o arquivo /tmp/hash-findclass.gzip existe
	if [ ! -e "$pom_cache_file" ]; then
		create_pom_cache_file "$pom_file_basename" "$pom_cache_file"
	fi
	exit 0

	class_list=$(gunzip --stdout "$pom_cache_file");
}


#create_pom_cache_file "$pom_file" "$pom_cache_file"
resolve_dependency() {
	local dep=$1
	if [[ "$dep" =~ ^\$\{[0-9a-zA-Z\.-]+\}$ ]]; then
		local var_name=$(echo $dep | sed -e 's/^\${//' -e 's/}$//')
		echo $(xml_grep --text_only "//properties/$var_name" "$pom_file")
	else
		echo "$dep"
	fi
}

create_pom_cache_file() {
	local pom_file=$1 shift;
	local pom_cache_file=$1
	local jar_to_search=''
	for dep in $(xml_grep --text_only 'dependency/artifactId' "$pom_file"); do
		jar_to_search=$(resolve_dependency $dep)
		echo "jar to search: $jar_to_search"
	done;
}


## se o arquivo /tmp/hash-findclass.gzip não existir

## obtenha cada dependencia em tags <dependency> de pom.xml
## xml_grep --text_only 'dependency/artifactId' pom.xml


## execute find ~/.m2/repository/<dependencia> -name '*.jar' | xargs -n 1 jar tf | sed -e 's/\//\./g' -e 's/\.class$//' -e 's/\.java$//'

## ao final desse loop, execute um sort | uniq sobre o arquivo temporario em questao



#find ~/.m2/repository/commons-lang/ -name '*.jar' | xargs -n 1 jar tf | sed -e 's/\//\./g' -e 's/\.class$//' -e 's/\.java$//' | sort | uniq |  fzf | xclip -i
get_classes_from_pom
