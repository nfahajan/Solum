t = int(input())

for _ in range(t):
    n = int(input())
    
    # Odd numbers are impossible
    if n % 2 == 1:
        print(-1)
        continue
    
    # Check if it's actually possible to make n
    # We need to check if there exist non-negative integers a, b such that 4a + 6b = n
    # This is possible if and only if n is even AND n != 2
    if n == 2:
        print(-1)
        continue
    
    # For minimum crafts: use as many Type B (6 units) as possible
    # For maximum crafts: use as many Type A (4 units) as possible
    
    # Maximum is simply n/4 (all Type A)
    max_crafts = n // 4
    
    # Minimum: use Type B as much as possible
    remainder = n % 6
    if remainder == 0:
        # All Type B
        min_crafts = n // 6
    elif remainder == 4:
        # Use 1 Type A and rest Type B: (n-4)/6 Type B + 1 Type A
        min_crafts = (n - 4) // 6 + 1
    else:
        # remainder == 2: Use 2 Type A and rest Type B: (n-8)/6 Type B + 2 Type A
        min_crafts = (n - 8) // 6 + 2
    
    print(min_crafts, max_crafts)