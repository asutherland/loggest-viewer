All the different log-rendering widgets go in here.  registry.js requires them
all and then provides a factory method that just does a dictionary lookup and
calls through.  There's no lazy loading right now, but there probably could be.
