Our subdirectories:
- logs: holds renderers for log entries and their friends
- states: hold renderers for visualizations of state, such as those emitted in
  event of a failure.  These might theoretically be reused outside a logging
  context.  Or just be super complex.  Or something.
