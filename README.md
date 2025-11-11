```markdown
# Solum – Run Guide

Three tasks:
- **A** Mystic Waves (Python)
- **B** CargoCraft Fleet (Python)
- **C** Login Page (React)

## Requirements
- Python 3.10+
- Node.js 18+ and npm

## Folder structure
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

````

---

## A) Mystic Waves
Run:
```bash
cd A
python3 A_mystic_waves.py < input_A.txt
````

Input format:

```
t
x1 n1
x2 n2
...
xt nt
```

---

## B) CargoCraft Fleet

Run:

```bash
cd B
python3 B_cargocraft_fleet.py < input_B.txt
```

Input format:

```
t
n1
n2
...
nt
```

---

## C) Login Page

Run:

```bash
cd C
npm install
npm run dev
```

Open the local URL printed in the terminal, usually [http://localhost:5173](http://localhost:5173).

Test users:

* [test@example.com](mailto:test@example.com) / Abcdef1!
* [admin@solum.test](mailto:admin@solum.test) / Secure9#
* [nia@elaria.io](mailto:nia@elaria.io) / WaveX8$z

```
```
