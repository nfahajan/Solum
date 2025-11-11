```markdown
# Solum – Run Guide (A, B, C)

## File structure
```

Solum/
A/
A_mystic_waves.py
input_A.txt
B/
B_cargocraft_fleet.py
input_B.txt
C/
package.json
index.html
vite.config.js
src/
App.jsx
index.css
main.jsx

```

## Requirements
- Python 3.10+
- Node.js 18+ and npm

---

## A) Mystic Waves (Python)
```

cd A
python3 A_mystic_waves.py < input_A.txt

```

**Input format**
```

t
x1 n1
x2 n2
...
xt nt

```

---

## B) CargoCraft Fleet (Python)
```

cd B
python3 B_cargocraft_fleet.py < input_B.txt

```

**Input format**
```

t
n1
n2
...
nt

```

---

## C) Login Page (React)
```

cd C
npm install
npm run dev

```
Open the printed local URL (usually http://localhost:5173).

**Test users**
- `test@example.com` / `Abcdef1!`
- `admin@solum.test` / `Secure9#`
- `nia@elaria.io` / `WaveX8$z`
```
