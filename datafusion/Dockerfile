FROM python:3.12.8-bookworm

WORKDIR /app

COPY . /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    zip

# Install Java 21
RUN wget https://download.oracle.com/java/21/archive/jdk-21.0.2_linux-aarch64_bin.tar.gz && \
    tar -xvzf jdk-21.0.2_linux-aarch64_bin.tar.gz -C /opt/ 

ENV JAVA_HOME=/opt/jdk-21.0.2
ENV PATH=$JAVA_HOME/bin:$PATH

# Install python libs
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5001

CMD ["python", "run.py"]