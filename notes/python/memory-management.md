# Allocator domains

- All memory allocations happen are grouped in 3 domains:
- You must free memory using the same domain that allocated it.
- The allocation domain decides which allocator to use eg malloc or pymalloc.

# 3 domains

1. Raw domain

- For very low-level, general purpose memory.
- Works even when Python's intepreter state isnt fully set up.
- Memory comes direct from the system allocator.
- Functions include `PyMem_RawMalloc`, `PyMem_RawRealloc()`

  ## Use cases

  - Allocating memory before Python is initialised.
  - When no thread-state is required.

2. Mem_Domain

- For python related general memory but not full Python objects.
- Requires an active Python thread state.
- Memory comes from the python private heap.
- Functions include PyMem_Malloc(), PyMem_Realloc() and PyMem_Free()

3. Object domain

- For actual Python objects, eg tuples, lists
- Memory comes from Python private heap, managed by the object allocator.
- Functions include PyObject_New(), PyObject_Del(), PyObject_Malloc()

# Summary of malloc and pymalloc

## malloc

- malloc is the standard memory allocator provided by the C standard library / operating system.
- CPython (the Python interpreter written in C) uses malloc for:
- Large allocations (> 512 bytes)
- Raw domain allocations (PyMem_RawMalloc)
- Internal operations where Python’s custom allocator isn’t suitable
- Regular Python code does not call malloc directly.
- It is slower and more general-purpose than Python’s custom allocator.

        ### Uses
        - Large allocations (> 512 bytes)
        - Raw allocations (Raw domain)
        - Situations where Python’s thread state is not available

        ### Why malloc?
        - Handles large or unusual allocations: pymalloc is inefficient for big blocks
        - Simplicity: Raw allocations bypass Python’s allocator
        - Universally available: Part of the OS / C library

        ### Tradeoff / limitation:
        - Slower for small objects
        - Can fragment memory more easily
        - Not integrated with Python’s memory tracking

## pymalloc

- pymalloc is CPython’s custom small-object allocator, implemented in obmalloc.c.
- Used for small allocations (≤ 512 bytes), which are extremely common in Python.
- Faster than malloc, reduces fragmentation, and improves cache locality.
  Used by: PyObject_Malloc (object domain), PyMem_Malloc for small sizes (mem domain)
- Falls back to malloc automatically for large blocks.

Used for

- Small allocations (≤ 512 bytes)
- Most Python objects (ints, floats, dicts, lists, internal structures)

  ## Why pymalloc?

  - Speed: Fast allocation/deallocation for small objects
  - Low fragmentation: Groups objects of the same size in pools → reduces wasted memory
  - Cache-friendly: Allocates contiguous memory → better CPU cache performance
  - Python-aware: Works with Python’s memory tracking and debugging tools

  ## Tradeoff / limitation:

  - Only works for small allocations
  - Slightly more complex internally (arenas, pools, blocks)

## Summary

- System malloc is used to get big chunks of memory from the OS.
- Python forms a private heap out of those chunks.
- pymalloc manages small object allocations inside that private heap.
- Raw memory allocations bypass pymalloc and use system malloc directly.

- Python stores all its objects in a private heap that is managed internally by the Python memory manager—not by the user. A raw memory allocator sits at the bottom, requesting large memory blocks from the operating system to keep the private heap supplied. On top of this, Python uses specialized object allocators (e.g., for ints, strings, tuples, dicts), each optimized for the storage needs of that object type. All these allocators work within the private heap.

- In short: the OS gives memory → raw allocator fills the private heap → object-specific allocators manage Python objects inside it, all fully controlled by the interpreter.

# CPython

- The default version of Python written in C
- It is the intepreter that compiles python code to bytecode and executes that bytecode in the Python Virtual Machine.
- It is the runtime and standard library, that manages objects, memory and garbage collection and provides built in types like list, dict and int.

# Thread state

- Thread-state in CPython refers to the internal data structure that stores all the information CPython needs to run Python code inside a particular thread.
