FROM python:3.12.8-bookworm

WORKDIR /app

COPY . /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    wget \
    zip \
    tar

# Define environment variable for architecture
ARG TARGETARCH
ENV ARCH=$TARGETARCH

# Set the Java version and download URL template
ENV JAVA_VERSION=21.0.2
ENV JAVA_BASE_URL=https://download.oracle.com/java/21/archive

# Set architecture-specific Java filename
RUN case "$ARCH" in \
      "amd64") JAVA_ARCH="x64";; \
      "arm64") JAVA_ARCH="aarch64";; \
      *) echo "Unsupported architecture: $ARCH" && exit 1;; \
    esac && \
    wget "$JAVA_BASE_URL/jdk-${JAVA_VERSION}_linux-${JAVA_ARCH}_bin.tar.gz" -O java.tar.gz && \
    mkdir -p /opt/java && \
    tar -xzf java.tar.gz -C /opt/java && \
    rm java.tar.gz

ENV JAVA_HOME=/opt/java/jdk-${JAVA_VERSION}
ENV PATH=$JAVA_HOME/bin:$PATH

# Install python libs
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5001

CMD ["python", "run.py"]