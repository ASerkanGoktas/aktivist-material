class SidenavService{
    constructor(){
        this.isSideNav = false;
    }

    toggleSidenav(){
        this.isSideNav = !this.isSideNav;
    }

    isSidenav(){
        return this.isSideNav;
    }
}
/////
export default SidenavService;