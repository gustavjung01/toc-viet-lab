import os
import urllib.request
import urllib.error

source_dir = 'temp-cases-staging'
files = sorted([f for f in os.listdir(source_dir) if f.endswith('.webp')])
all_ok = True
print('FILES', len(files))
for name in files:
    url = f'https://cdn.tocvietlab.studio/images/cases/{name}'
    req = urllib.request.Request(url, method='HEAD')
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            code = resp.getcode()
            print(f'{name} {code}')
            if code != 200:
                all_ok = False
    except urllib.error.HTTPError as e:
        print(f'{name} HTTPError {e.code}')
        all_ok = False
    except urllib.error.URLError as e:
        print(f'{name} URLError {e.reason}')
        all_ok = False
print('ALL_OK' if all_ok else 'NOT_OK')
