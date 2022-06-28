import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  DATA = {
    "backgroundColor": "#27ce48",
    "colorText": "#072457",
    "routeImage": "/assets/banner2.jpg",
    "displayCart": 1,
    "displayWishList": 1,
    "letterSpacing": "0.5px",
    "lineHeight": "1.5",
  }

  statusToShow = {
    activeMenuMobileState: "",
    activeWishListState: "",
    activeCartState: "",
  }

  ITEMS_MENU = [{
    'id': 1,
    "name": "Principal",
    "url": "https://www.google.com.pe/",
    "subMenu": [],
    "subMenuQuantity": 0,
  }, {
    'id': 2,
    "name": "Contactanos",
    "url": "https://www.google.com.pe/",
    "subMenu": [],
    "subMenuQuantity": 0,
  }, {
    'id': 3,
    "name": "Servicios",
    "url": "https://www.google.com.pe/",
    "subMenu": [{
      'id': 4,
      "name": "Páginas web",
      "url": "https://www.google.com.pe/",
      "subMenu": [],
      "subMenuQuantity": 0,
    }, {
      'id': 5,
      "name": "Sistemas web",
      "url": "https://www.google.com.pe/",
      "subMenu": [],
      "subMenuQuantity": 0,
    }],
    "subMenuQuantity": 2,
  }];




  constructor() { }

  ngOnInit(): void {
  }

  toggleActiveMenuMobileState() {
    if (this.statusToShow.activeMenuMobileState == "active-menuMobile-overlay") {
      this.statusToShow.activeMenuMobileState = "";
      return
    }
    if (this.statusToShow.activeMenuMobileState == "") {
      this.statusToShow.activeMenuMobileState = "active-menuMobile-overlay";
      return
    }
  }

  toggleSubMenus(id: number) {
    const box = document.getElementById("boxSubMenuOfMenu_" + id);
    if (box) {
      if (box.style.display == "block") {
        box.style.display = 'none';
      } else {
        box.style.display = 'block';
      }
    }
  }


}
