FROM geosolutionsit/mapstore2:latest
MAINTAINER geosolutions<info@geo-solutions.it>

# externalize geostore configuration
ENV JAVA_OPTS="${JAVA_OPTS} -Dgeostore-ovr=file://${CATALINA_BASE}/conf/geostore-datasource-ovr.properties"

RUN rm -rf ${CATALINA_BASE}/webapps

ADD austrocontrol-ms2.war "${CATALINA_BASE}/webapps/austrocontrol-ms2.war"
