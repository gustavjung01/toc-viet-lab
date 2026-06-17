CREATE TABLE IF NOT EXISTS tocviet.recruitment_orders (
  id text PRIMARY KEY,
  user_id text NOT NULL,
  order_type text NOT NULL,
  package_code text NOT NULL,
  quantity_total integer NOT NULL DEFAULT 0,
  quantity_used integer NOT NULL DEFAULT 0,
  amount numeric(18,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'VND',
  status text NOT NULL DEFAULT 'pending',
  payment_ref text NOT NULL DEFAULT '',
  paid_at bigint,
  expires_at bigint,
  created_at bigint NOT NULL DEFAULT (extract(epoch from now())::bigint),
  updated_at bigint NOT NULL DEFAULT (extract(epoch from now())::bigint),
  CONSTRAINT recruitment_orders_order_type_check
    CHECK (order_type IN ('post_package', 'boost_package')),
  CONSTRAINT recruitment_orders_package_code_check
    CHECK (package_code IN ('starter', 'growth', 'boost')),
  CONSTRAINT recruitment_orders_status_check
    CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  CONSTRAINT recruitment_orders_quantity_check
    CHECK (quantity_total >= 0 AND quantity_used >= 0 AND quantity_used <= quantity_total),
  CONSTRAINT recruitment_orders_amount_check
    CHECK (amount >= 0)
);

CREATE INDEX IF NOT EXISTS recruitment_orders_user_id_idx
  ON tocviet.recruitment_orders (user_id);

CREATE INDEX IF NOT EXISTS recruitment_orders_user_status_type_idx
  ON tocviet.recruitment_orders (user_id, status, order_type);

CREATE INDEX IF NOT EXISTS recruitment_orders_expires_at_idx
  ON tocviet.recruitment_orders (expires_at);

CREATE INDEX IF NOT EXISTS recruitment_orders_paid_at_idx
  ON tocviet.recruitment_orders (paid_at, created_at);
