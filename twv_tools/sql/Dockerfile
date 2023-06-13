from mysql:8.0.30-debian
COPY ./sql/my.cnf /etc/mysql/conf.d/my.cnf
COPY ./sql/init/* /docker-entrypoint-initdb.d
RUN apt-get update \
    && apt-get install -y locales \
    && sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=ja_JP.UTF-8 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 3306
CMD ["mysqld"]