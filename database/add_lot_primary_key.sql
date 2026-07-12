do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conrelid = 'purchase.lot'::regclass
          and contype = 'p'
    ) then
        alter table purchase.lot
            add constraint lot_pkey primary key (lot_name, customer_code);
    end if;
end
$$;
