create schema if not exists purchase;

create table if not exists purchase.customer (
    customer_code varchar primary key,
    customer_name varchar not null,
    customer_inn varchar,
    customer_kpp varchar,
    customer_legal_address varchar,
    customer_postal_address varchar,
    customer_email varchar,
    customer_code_main varchar references purchase.customer(customer_code) on update cascade on delete set null,
    is_organization bool not null default true,
    is_person bool not null default false,
    constraint customer_type_check check (is_organization <> is_person)
);

create table if not exists purchase.lot (
    lot_name varchar not null,
    customer_code varchar not null references purchase.customer(customer_code) on update cascade on delete restrict,
    price numeric(18, 2) not null check (price >= 0),
    currency_code varchar not null check (currency_code in ('RUB', 'USD', 'EUR')),
    nds_rate varchar not null check (nds_rate in ('Без НДС', '18%', '20%')),
    place_delivery varchar,
    date_delivery timestamp
);

create index if not exists idx_customer_name on purchase.customer(customer_name);
create index if not exists idx_lot_name on purchase.lot(lot_name);
create index if not exists idx_lot_customer_code on purchase.lot(customer_code);
