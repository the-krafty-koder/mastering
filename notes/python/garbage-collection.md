- Main garbage collection algorithm used in Python is reference counting. The problem with reference counting is it doesnt not handle reference cycles.

```
>>> container = []
>>> container.append(container)
>>> sys.getrefcount(container)
3
>>> del container
```

- In this example, container holds a reference to itself, so even when we remove our reference to it (the variable "container") the reference count never falls to 0 because it still has its own internal reference. Therefore it would never be cleaned just by simple reference counting.
- For this reason some additional machinery is needed to clean these reference cycles between objects once they become unreachable. This is the cyclic garbage collector,
