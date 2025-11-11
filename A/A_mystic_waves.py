t = int(input())

for _ in range(t):
    x, n = map(int, input().split())
    
    # If we have odd number of waves, one x remains
    # If even, they all cancel out
    if n % 2 == 1:
        result = x
    else:
        result = 0
    
    print(result)