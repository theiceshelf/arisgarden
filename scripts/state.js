/**
 * Booting point for all state related things.
 */

const $act = {
  updateCurrentRecipeStep: (s, i) => ({ ...s, currentRecipeStep: i }),

  setTimer: (s, p) => ({
    ...s,
    timer: p.time,
    timerRunning: true,
    currentRecipeStepText: p.step
  }),


  setRoute: (state, props) => ({ ...state, route: props.route }),

  setId: (s, p) => {
    return { ...s, currentId: p };
  },


  setRoutePath: (a, s) => {
    let { event, state } = s;
    let hash = location.hash;
    let newRoute = v.getRoute(hash, state)

    // TODO: parse the route and build a slug fetcher from it.
    let newState = ({
      ...state,
      route: hash,
      currentRoute: newRoute.view,
      currentId: newRoute.id,
      currentRecipe: db.recipes[newRoute.id] // not optimal?
    })
    return (newState)
  },

  cancelTimer: s => ({ ...s, timer: null, timerRunning: false }),

  setRoute: (s, p) => ({ ...s, route: p }),

  countDown: (s, t) => {
    if (s.timer == 0) {
      return { ...s, timer: null, timerRunning: false };
    } else {
      return { ...s, timer: s.timer - 1 };
    }
  }
};

var initState = {
  currentRecipe: db.recipes["shakshuka"],
  currentId: null,
  currentRecipeStep: 0,
  currentRecipeStepText: "",
  currentRoute: () => h("div", {}, "loading state"),
  timer: null,
  timerRunning: false,
  route: "/"
};


var subscriptions = (state) => [
  state.timerRunning && interval($act.countDown, { delay: 1000 }),
  true && v.handleRouter($act.setRoutePath, state)
]
