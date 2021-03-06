App Framework Change History
============================

3.5.0
-----

* Controller: "*" can now be used to create a catch-all route that will match
  any path (previously it was necessary to use a regex to do this).

* Controller: The `hasRoute()` method now accepts full URLs as well as paths.

* Controller: When multiple Controller instances exist on a page, calling
  `save()` in one will now cause matching routes to be dispatched in all
  controllers, rather than only the controller that was the source of the
  change.


3.4.1
-----

* Controller: Added a workaround for an iOS 4 bug that causes the previous URL
  to be displayed in the location bar after calling `save()` or `replace()` with
  a new URL.

* Controller: Fixed a bug that caused the controller to get stuck in a
  "dispatching" state if `save()` was called with no routes defined.

* Model: The `validate()` method is now only called when `save()` is called,
  rather than on every attribute change. If validation fails, the save operation
  will be aborted.


3.4.0
-----

* Initial release.
