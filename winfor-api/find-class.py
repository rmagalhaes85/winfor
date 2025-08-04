from xml.etree.ElementTree import ElementTree

doc = ElementTree(file='pom.xml')
for dep in doc.findall('dependencies/dependency', namespaces={'':'http://maven.apache.org/POM/4.0.0'}):
    print(dep)
