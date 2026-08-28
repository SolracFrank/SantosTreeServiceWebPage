create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null,
  email varchar(100) not null,
  phone varchar(20),
  subject varchar(200),
  message text not null,
  status varchar(20) not null default 'new',
  created_at timestamptz not null default now(),

  constraint contact_messages_name_length
    check (char_length(trim(name)) between 1 and 100),
  constraint contact_messages_email_format
    check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  constraint contact_messages_phone_length
    check (phone is null or char_length(phone) between 1 and 20),
  constraint contact_messages_subject_length
    check (subject is null or char_length(subject) between 1 and 200),
  constraint contact_messages_message_length
    check (char_length(trim(message)) between 10 and 2000),
  constraint contact_messages_status_valid
    check (status in ('new', 'read', 'archived'))
);

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from anon, authenticated;

grant insert (name, email, phone, subject, message)
on table public.contact_messages
to anon, authenticated;

drop policy if exists "Public can submit contact messages"
on public.contact_messages;

create policy "Public can submit contact messages"
on public.contact_messages
for insert
to anon, authenticated
with check (status = 'new');
