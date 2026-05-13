# Script migrate D1 via Cloudflare REST API
$ACCOUNT_ID = $env:CLOUDFLARE_ACCOUNT_ID
$DATABASE_ID = $env:CLOUDFLARE_D1_DATABASE_ID
$TOKEN = $env:CLOUDFLARE_D1_TOKEN
$API_URL = "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/query"

$headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type"  = "application/json"
}

$statements = @(
    "CREATE TABLE IF NOT EXISTS ``users`` (``id`` text PRIMARY KEY NOT NULL, ``name`` text, ``email`` text NOT NULL UNIQUE, ``email_verified`` integer, ``image`` text, ``password_hash`` text, ``role`` text DEFAULT 'free' NOT NULL, ``ai_credits`` integer DEFAULT 3 NOT NULL, ``created_at`` integer DEFAULT (unixepoch()))",
    "CREATE TABLE IF NOT EXISTS ``accounts`` (``id`` text PRIMARY KEY NOT NULL, ``user_id`` text NOT NULL, ``type`` text NOT NULL, ``provider`` text NOT NULL, ``provider_account_id`` text NOT NULL, ``refresh_token`` text, ``access_token`` text, ``expires_at`` integer, ``token_type`` text, ``scope`` text, ``id_token`` text, ``session_state`` text, FOREIGN KEY (``user_id``) REFERENCES ``users``(``id``) ON DELETE cascade)",
    "CREATE TABLE IF NOT EXISTS ``sessions`` (``id`` text PRIMARY KEY NOT NULL, ``session_token`` text NOT NULL UNIQUE, ``user_id`` text NOT NULL, ``expires`` integer NOT NULL, FOREIGN KEY (``user_id``) REFERENCES ``users``(``id``) ON DELETE cascade)",
    "CREATE TABLE IF NOT EXISTS ``verification_tokens`` (``identifier`` text NOT NULL, ``token`` text NOT NULL UNIQUE, ``expires`` integer NOT NULL)",
    "CREATE TABLE IF NOT EXISTS ``articles`` (``id`` text PRIMARY KEY NOT NULL, ``slug`` text NOT NULL UNIQUE, ``title`` text NOT NULL, ``excerpt`` text, ``content`` text, ``category`` text, ``difficulty`` text, ``read_time`` integer, ``image_key`` text, ``published`` integer DEFAULT true, ``created_at`` integer DEFAULT (unixepoch()))",
    "CREATE TABLE IF NOT EXISTS ``cases`` (``id`` text PRIMARY KEY NOT NULL, ``title`` text NOT NULL, ``description`` text, ``category`` text, ``before_image_key`` text, ``after_image_key`` text, ``analysis`` text, ``formula`` text, ``published`` integer DEFAULT true, ``created_at`` integer DEFAULT (unixepoch()))",
    "CREATE TABLE IF NOT EXISTS ``formulas`` (``id`` text PRIMARY KEY NOT NULL, ``title`` text NOT NULL, ``tag`` text, ``base`` text, ``developer`` text, ``ratio`` text, ``note`` text, ``image_key`` text, ``published`` integer DEFAULT true, ``created_at`` integer DEFAULT (unixepoch()))",
    "CREATE TABLE IF NOT EXISTS ``saved_items`` (``id`` text PRIMARY KEY NOT NULL, ``user_id`` text NOT NULL, ``item_type`` text NOT NULL, ``item_id`` text NOT NULL, ``created_at`` integer DEFAULT (unixepoch()), FOREIGN KEY (``user_id``) REFERENCES ``users``(``id``) ON DELETE cascade)",
    "CREATE TABLE IF NOT EXISTS ``ai_usage_logs`` (``id`` text PRIMARY KEY NOT NULL, ``user_id`` text NOT NULL, ``tool`` text NOT NULL, ``credits_used`` integer DEFAULT 1 NOT NULL, ``prompt`` text, ``result`` text, ``created_at`` integer DEFAULT (unixepoch()), FOREIGN KEY (``user_id``) REFERENCES ``users``(``id``) ON DELETE cascade)"
)

foreach ($sql in $statements) {
    $body = @{ sql = $sql } | ConvertTo-Json
    try {
        $response = Invoke-RestMethod -Uri $API_URL -Method POST -Headers $headers -Body $body
        if ($response.success) {
            $table = ($sql -split "``")[1]
            Write-Host "OK  $table" -ForegroundColor Green
        } else {
            Write-Host "ERR $($response.errors)" -ForegroundColor Red
        }
    } catch {
        Write-Host "FAIL: $_" -ForegroundColor Red
    }
}

Write-Host "`nXong! Kiem tra tables:" -ForegroundColor Cyan
$checkBody = @{ sql = "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name" } | ConvertTo-Json
$check = Invoke-RestMethod -Uri $API_URL -Method POST -Headers $headers -Body $checkBody
$check.result.results | ForEach-Object { Write-Host "  - $($_.name)" }
