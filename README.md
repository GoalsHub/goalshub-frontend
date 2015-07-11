# goalshub-frontend

## Postgress

### Database creation

    psql --user=postgres --port=5432 --host=localhost

    create user goalshub_dev with createdb password 'goalshub_dev';
    create user goalshub_test with createdb password 'goalshub_test';
    create user goalshub_prod with createdb password 'goalshub_prod';
