+++
title = "Ampersand Operator in Ruby"
date = "2016-04-04"
description = "How the & operator works in Ruby with Procs and blocks"
tags = ["Ruby"]
+++

Here's how a function call with an ampersand looks:

```ruby
some_function(&an_object)
```

When used like this, the `&` operator calls `to_proc` on the argument and passes the resulting `Proc` object (explained below) as a block to the method.

## What's a Proc?

A `Proc` object encapsulates a function or a block in a way that can be passed around as a variable. We can initialize one with a block like this:

```ruby
mult = Proc.new { |x, y| x * y }
```

Then use the `call` method to invoke it:

```ruby
mult.call(4, 5)
```

This returns `20`.
