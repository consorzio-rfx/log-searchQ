FROM bitnami/spark:3.5.3

# ------------------------------------------------------------------------------------------------------------------------------------------------------------------
# FOR REFERENCE 
#
# FROM docker.io/bitnami/minideb:bookworm

# ARG DOWNLOADS_URL="downloads.bitnami.com/files/stacksmith"
# ARG JAVA_EXTRA_SECURITY_DIR="/bitnami/java/extra-security"
# ARG TARGETARCH

# LABEL com.vmware.cp.artifact.flavor="sha256:c50c90cfd9d12b445b011e6ad529f1ad3daea45c26d20b00732fae3cd71f6a83" \
#       org.opencontainers.image.base.name="docker.io/bitnami/minideb:bookworm" \
#       org.opencontainers.image.created="2025-03-15T21:12:21Z" \
#       org.opencontainers.image.description="Application packaged by Broadcom, Inc." \
#       org.opencontainers.image.documentation="https://github.com/bitnami/containers/tree/main/bitnami/spark/README.md" \
#       org.opencontainers.image.ref.name="3.5.5-debian-12-r1" \
#       org.opencontainers.image.source="https://github.com/bitnami/containers/tree/main/bitnami/spark" \
#       org.opencontainers.image.title="spark" \
#       org.opencontainers.image.vendor="Broadcom, Inc." \
#       org.opencontainers.image.version="3.5.5"

# ENV HOME="/" \
#     OS_ARCH="${TARGETARCH:-amd64}" \
#     OS_FLAVOUR="debian-12" \
#     OS_NAME="linux" \
#     PATH="/opt/bitnami/python/bin:/opt/bitnami/java/bin:/opt/bitnami/spark/bin:/opt/bitnami/spark/sbin:$PATH"

# COPY prebuildfs /
# SHELL ["/bin/bash", "-o", "errexit", "-o", "nounset", "-o", "pipefail", "-c"]

# # Install required system packages and dependencies
# RUN install_packages ca-certificates curl libbz2-1.0 libcom-err2 libcrypt1 libffi8 libgcc-s1 libgssapi-krb5-2 libk5crypto3 libkeyutils1 libkrb5-3 libkrb5support0 liblzma5 libncursesw6 libnsl2 libreadline8 libsqlite3-0 libssl3 libstdc++6 libtinfo6 libtirpc3 procps zlib1g
# RUN mkdir -p /tmp/bitnami/pkg/cache/ ; cd /tmp/bitnami/pkg/cache/ ; \
#     COMPONENTS=( \
#       "python-3.12.9-8-linux-${OS_ARCH}-debian-12" \
#       "jre-17.0.14-10-1-linux-${OS_ARCH}-debian-12" \
#       "spark-3.5.5-0-linux-${OS_ARCH}-debian-12" \
#     ) ; \
#     for COMPONENT in "${COMPONENTS[@]}"; do \
#       if [ ! -f "${COMPONENT}.tar.gz" ]; then \
#         curl -SsLf "https://${DOWNLOADS_URL}/${COMPONENT}.tar.gz" -O ; \
#         curl -SsLf "https://${DOWNLOADS_URL}/${COMPONENT}.tar.gz.sha256" -O ; \
#       fi ; \
#       sha256sum -c "${COMPONENT}.tar.gz.sha256" ; \
#       tar -zxf "${COMPONENT}.tar.gz" -C /opt/bitnami --strip-components=2 --no-same-owner --wildcards '*/files' ; \
#       rm -rf "${COMPONENT}".tar.gz{,.sha256} ; \
#     done
# RUN apt-get autoremove --purge -y curl && \
#     apt-get update && apt-get upgrade -y && \
#     apt-get clean && rm -rf /var/lib/apt/lists /var/cache/apt/archives
# RUN chmod g+rwX /opt/bitnami
# RUN find / -perm /6000 -type f -exec chmod a-s {} \; || true
# RUN mkdir /.local && chmod g+rwX /.local

# COPY rootfs /
# RUN /opt/bitnami/scripts/spark/postunpack.sh
# RUN /opt/bitnami/scripts/java/postunpack.sh
# ENV APP_VERSION="3.5.5" \
#     BITNAMI_APP_NAME="spark" \
#     JAVA_HOME="/opt/bitnami/java" \
#     LD_LIBRARY_PATH="/opt/bitnami/python/lib:/opt/bitnami/spark/venv/lib/python3.12/site-packages/numpy.libs:$LD_LIBRARY_PATH" \
#     LIBNSS_WRAPPER_PATH="/opt/bitnami/common/lib/libnss_wrapper.so" \
#     NSS_WRAPPER_GROUP="/opt/bitnami/spark/tmp/nss_group" \
#     NSS_WRAPPER_PASSWD="/opt/bitnami/spark/tmp/nss_passwd" \
#     PYTHONPATH="/opt/bitnami/spark/python/:$PYTHONPATH" \
#     SPARK_HOME="/opt/bitnami/spark" \
#     SPARK_USER="spark"

# WORKDIR /opt/bitnami/spark
# USER 1001
# ENTRYPOINT [ "/opt/bitnami/scripts/spark/entrypoint.sh" ]
# CMD [ "/opt/bitnami/scripts/spark/run.sh" ]

# ------------------------------------------------------------------------------------------------------------------------------------------------------------------


#   __  __ ____  ____        _           
#  |  \/  |  _ \/ ___| _ __ | |_   _ ___ 
#  | |\/| | | | \___ \| '_ \| | | | / __|
#  | |  | | |_| |___) | |_) | | |_| \__ \
#  |_|  |_|____/|____/| .__/|_|\__,_|___/
#                     |_|                

# install as root
USER 0

# add mdsplus repo key
RUN apt update -y && apt install -y curl && \
    curl -fsSL http://www.mdsplus.org/dist/mdsplus.gpg.key | tee /usr/share/keyrings/mdsplus.asc > /dev/null

# install mdsplus repo
RUN \
    sh -c "echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/mdsplus.asc] http://www.mdsplus.org/dist/debian/bookworm/repo MDSplus alpha' > /etc/apt/sources.list.d/mdsplus.list" &&\
    sh -c "echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/mdsplus.asc] http://www.mdsplus.org/dist/debian/bookworm/repo MDSplus stable' > /etc/apt/sources.list.d/mdsplus.list" 

# install mdsplus components
RUN apt update -y &&\
    apt install -y libreadline-dev &&\
    apt install -y mdsplus-python mdsplus-kernel mdsplus

# fix python for MDSplus
RUN pip install numpy --upgrade &&\
    echo "/usr/local/mdsplus/python" > /opt/bitnami/python/lib/python3.12/site-packages/mdsplus.pth

# install RFX evironment
COPY envsyms /usr/local/mdsplus/local/envsyms

# source mdsplus setup for each task 
COPY --chown=1001:1001 spark-env.sh /opt/bitnami/spark/conf/spark-env.sh

# change run script
COPY --chown=1001:1001 --chmod=755 spark-run.sh /spark-run.sh
CMD [ "/spark-run.sh" ]

# restore spark default user
USER 1001

# ------------------------------------------------------------------------------------------------------------------------------------------------------------------

#   _                                           _      ___  
#  | | ___   __ _       ___  ___  __ _ _ __ ___| |__  / _ \ 
#  | |/ _ \ / _` |_____/ __|/ _ \/ _` | '__/ __| '_ \| | | |
#  | | (_) | (_| |_____\__ \  __/ (_| | | | (__| | | | |_| |
#  |_|\___/ \__, |     |___/\___|\__,_|_|  \___|_| |_|\__\_\
#           |___/                                           

# Optional: custom logging
COPY log4j2.properties /opt/bitnami/spark/conf/log4j2.properties

COPY requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

# Since the cluster will deserialize your app and run it, the cluster need similar depenecies.
# ie. if your app uses numpy
# RUN pip install numpy


