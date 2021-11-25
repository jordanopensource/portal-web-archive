export default {
  setMenus(state, menus) {
    const obj = {}
    menus.forEach((m) => {
      obj[m.menuId] = m
    })
    state.loadedMenus = obj
  },
}
