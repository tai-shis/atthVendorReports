# atthVendorReports
## Overview
this is a webapp for atth vendors to access their sales reports

## Development
This project uses direnv and Nix for development environment management
```sh
# Allow direnv to exist :D
direnv allow
```

## TODO
- [x] Redo Database Table Setup
- [x] Refactor Register to account for id setup
- [x] Admin panel to add valid vendors
- [ ] Admin panel removing users and vendors
- [ ] Get MVP up and running
- [x] test fetch orders
 - [x] implement simple frontend to call this

## MVP Requirements
- [ ] **Just get a beta version working**
- [x] Set up order tables in the database
- [x] Pulling orders from square api
 - This will have to be all vendor orders
- [x] Compiling order data into the database
- [x] Vendor Dashboard
 - similar to square dashboard?
- [ ] something else?