
FROM postgres

COPY logbookRFX.sql /
RUN psql -U helloworld -d logbookdb  -a -f /logbookRFX.sql >/dev/null

EXPOSE 5432