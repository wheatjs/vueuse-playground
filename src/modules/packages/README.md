# Package Manager

The package manager will automatically download the latest version of a package from the CDN defined in the root configuration file of the project. Pacakges and their types will be cached according to their version to avoid having to constantly re-downlaod packages.

## Caching

When a package is installed the package and its types will be automatically cached in loacl storage. When the page is loaded and a package is added it will use the chaced version while at the same time checking if the package is the latest version. If it is, nothing will be done, if the package is outdated and the current package isn't locked to a specifc version, it will update to the latest version.