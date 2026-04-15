(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
  new MutationObserver((n) => {
    for (const u of n)
      if (u.type === "childList")
        for (const i of u.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && a(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(n) {
    const u = {};
    return (
      n.integrity && (u.integrity = n.integrity),
      n.referrerPolicy && (u.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function a(n) {
    if (n.ep) return;
    n.ep = !0;
    const u = l(n);
    fetch(n.href, u);
  }
})();
function zr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ur = { exports: {} },
  Yu = {};
/** * @license React * react-jsx-runtime.production.js * * Copyright (c) Meta Platforms, Inc. and affiliates. * * This source code is licensed under the MIT license found in the * LICENSE file in the root directory of this source tree. */ var qh =
    Symbol.for("react.transitional.element"),
  Lh = Symbol.for("react.fragment");
function Hr(e, t, l) {
  var a = null;
  if (
    (l !== void 0 && (a = "" + l),
    t.key !== void 0 && (a = "" + t.key),
    "key" in t)
  ) {
    l = {};
    for (var n in t) n !== "key" && (l[n] = t[n]);
  } else l = t;
  return (
    (t = l.ref),
    { $$typeof: qh, type: e, key: a, ref: t !== void 0 ? t : null, props: l }
  );
}
Yu.Fragment = Lh;
Yu.jsx = Hr;
Yu.jsxs = Hr;
Ur.exports = Yu;
var c = Ur.exports,
  qr = { exports: {} },
  q = {};
/** * @license React * react.production.js * * Copyright (c) Meta Platforms, Inc. and affiliates. * * This source code is licensed under the MIT license found in the * LICENSE file in the root directory of this source tree. */ var wi =
    Symbol.for("react.transitional.element"),
  Bh = Symbol.for("react.portal"),
  Yh = Symbol.for("react.fragment"),
  wh = Symbol.for("react.strict_mode"),
  Vh = Symbol.for("react.profiler"),
  Qh = Symbol.for("react.consumer"),
  Gh = Symbol.for("react.context"),
  Xh = Symbol.for("react.forward_ref"),
  Zh = Symbol.for("react.suspense"),
  kh = Symbol.for("react.memo"),
  Lr = Symbol.for("react.lazy"),
  ws = Symbol.iterator;
function Kh(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ws && e[ws]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Br = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Yr = Object.assign,
  wr = {};
function ya(e, t, l) {
  ((this.props = e),
    (this.context = t),
    (this.refs = wr),
    (this.updater = l || Br));
}
ya.prototype.isReactComponent = {};
ya.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
ya.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Vr() {}
Vr.prototype = ya.prototype;
function Vi(e, t, l) {
  ((this.props = e),
    (this.context = t),
    (this.refs = wr),
    (this.updater = l || Br));
}
var Qi = (Vi.prototype = new Vr());
Qi.constructor = Vi;
Yr(Qi, ya.prototype);
Qi.isPureReactComponent = !0;
var Vs = Array.isArray,
  ae = { H: null, A: null, T: null, S: null },
  Qr = Object.prototype.hasOwnProperty;
function Gi(e, t, l, a, n, u) {
  return (
    (l = u.ref),
    { $$typeof: wi, type: e, key: t, ref: l !== void 0 ? l : null, props: u }
  );
}
function Jh(e, t) {
  return Gi(e.type, t, void 0, void 0, void 0, e.props);
}
function Xi(e) {
  return typeof e == "object" && e !== null && e.$$typeof === wi;
}
function $h(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (l) {
      return t[l];
    })
  );
}
var Qs = /\/+/g;
function lc(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? $h("" + e.key)
    : t.toString(36);
}
function Gs() {}
function Wh(e) {
  switch (e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw e.reason;
    default:
      switch (
        (typeof e.status == "string"
          ? e.then(Gs, Gs)
          : ((e.status = "pending"),
            e.then(
              function (t) {
                e.status === "pending" &&
                  ((e.status = "fulfilled"), (e.value = t));
              },
              function (t) {
                e.status === "pending" &&
                  ((e.status = "rejected"), (e.reason = t));
              },
            )),
        e.status)
      ) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw e.reason;
      }
  }
  throw e;
}
function Ll(e, t, l, a, n) {
  var u = typeof e;
  (u === "undefined" || u === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (u) {
      case "bigint":
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case wi:
          case Bh:
            i = !0;
            break;
          case Lr:
            return ((i = e._init), Ll(i(e._payload), t, l, a, n));
        }
    }
  if (i)
    return (
      (n = n(e)),
      (i = a === "" ? "." + lc(e, 0) : a),
      Vs(n)
        ? ((l = ""),
          i != null && (l = i.replace(Qs, "$&/") + "/"),
          Ll(n, t, l, "", function (r) {
            return r;
          }))
        : n != null &&
          (Xi(n) &&
            (n = Jh(
              n,
              l +
                (n.key == null || (e && e.key === n.key)
                  ? ""
                  : ("" + n.key).replace(Qs, "$&/") + "/") +
                i,
            )),
          t.push(n)),
      1
    );
  i = 0;
  var s = a === "" ? "." : a + ":";
  if (Vs(e))
    for (var f = 0; f < e.length; f++)
      ((a = e[f]), (u = s + lc(a, f)), (i += Ll(a, t, l, u, n)));
  else if (((f = Kh(e)), typeof f == "function"))
    for (e = f.call(e), f = 0; !(a = e.next()).done; )
      ((a = a.value), (u = s + lc(a, f++)), (i += Ll(a, t, l, u, n)));
  else if (u === "object") {
    if (typeof e.then == "function") return Ll(Wh(e), t, l, a, n);
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  }
  return i;
}
function Dn(e, t, l) {
  if (e == null) return e;
  var a = [],
    n = 0;
  return (
    Ll(e, a, "", "", function (u) {
      return t.call(l, u, n++);
    }),
    a
  );
}
function Fh(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (l) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = l));
        },
        function (l) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = l));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Xs =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        if (
          typeof window == "object" &&
          typeof window.ErrorEvent == "function"
        ) {
          var t = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof e == "object" && e !== null && typeof e.message == "string"
                ? String(e.message)
                : String(e),
            error: e,
          });
          if (!window.dispatchEvent(t)) return;
        } else if (
          typeof process == "object" &&
          typeof process.emit == "function"
        ) {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      };
function Ih() {}
q.Children = {
  map: Dn,
  forEach: function (e, t, l) {
    Dn(
      e,
      function () {
        t.apply(this, arguments);
      },
      l,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Dn(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Dn(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Xi(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
q.Component = ya;
q.Fragment = Yh;
q.Profiler = Vh;
q.PureComponent = Vi;
q.StrictMode = wh;
q.Suspense = Zh;
q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ae;
q.act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
q.cache = function (e) {
  return function () {
    return e.apply(null, arguments);
  };
};
q.cloneElement = function (e, t, l) {
  if (e == null)
    throw Error(
      "The argument must be a React element, but you passed " + e + ".",
    );
  var a = Yr({}, e.props),
    n = e.key,
    u = void 0;
  if (t != null)
    for (i in (t.ref !== void 0 && (u = void 0),
    t.key !== void 0 && (n = "" + t.key),
    t))
      !Qr.call(t, i) ||
        i === "key" ||
        i === "__self" ||
        i === "__source" ||
        (i === "ref" && t.ref === void 0) ||
        (a[i] = t[i]);
  var i = arguments.length - 2;
  if (i === 1) a.children = l;
  else if (1 < i) {
    for (var s = Array(i), f = 0; f < i; f++) s[f] = arguments[f + 2];
    a.children = s;
  }
  return Gi(e.type, n, void 0, void 0, u, a);
};
q.createContext = function (e) {
  return (
    (e = {
      $$typeof: Gh,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (e.Provider = e),
    (e.Consumer = { $$typeof: Qh, _context: e }),
    e
  );
};
q.createElement = function (e, t, l) {
  var a,
    n = {},
    u = null;
  if (t != null)
    for (a in (t.key !== void 0 && (u = "" + t.key), t))
      Qr.call(t, a) &&
        a !== "key" &&
        a !== "__self" &&
        a !== "__source" &&
        (n[a] = t[a]);
  var i = arguments.length - 2;
  if (i === 1) n.children = l;
  else if (1 < i) {
    for (var s = Array(i), f = 0; f < i; f++) s[f] = arguments[f + 2];
    n.children = s;
  }
  if (e && e.defaultProps)
    for (a in ((i = e.defaultProps), i)) n[a] === void 0 && (n[a] = i[a]);
  return Gi(e, u, void 0, void 0, null, n);
};
q.createRef = function () {
  return { current: null };
};
q.forwardRef = function (e) {
  return { $$typeof: Xh, render: e };
};
q.isValidElement = Xi;
q.lazy = function (e) {
  return { $$typeof: Lr, _payload: { _status: -1, _result: e }, _init: Fh };
};
q.memo = function (e, t) {
  return { $$typeof: kh, type: e, compare: t === void 0 ? null : t };
};
q.startTransition = function (e) {
  var t = ae.T,
    l = {};
  ae.T = l;
  try {
    var a = e(),
      n = ae.S;
    (n !== null && n(l, a),
      typeof a == "object" &&
        a !== null &&
        typeof a.then == "function" &&
        a.then(Ih, Xs));
  } catch (u) {
    Xs(u);
  } finally {
    ae.T = t;
  }
};
q.unstable_useCacheRefresh = function () {
  return ae.H.useCacheRefresh();
};
q.use = function (e) {
  return ae.H.use(e);
};
q.useActionState = function (e, t, l) {
  return ae.H.useActionState(e, t, l);
};
q.useCallback = function (e, t) {
  return ae.H.useCallback(e, t);
};
q.useContext = function (e) {
  return ae.H.useContext(e);
};
q.useDebugValue = function () {};
q.useDeferredValue = function (e, t) {
  return ae.H.useDeferredValue(e, t);
};
q.useEffect = function (e, t) {
  return ae.H.useEffect(e, t);
};
q.useId = function () {
  return ae.H.useId();
};
q.useImperativeHandle = function (e, t, l) {
  return ae.H.useImperativeHandle(e, t, l);
};
q.useInsertionEffect = function (e, t) {
  return ae.H.useInsertionEffect(e, t);
};
q.useLayoutEffect = function (e, t) {
  return ae.H.useLayoutEffect(e, t);
};
q.useMemo = function (e, t) {
  return ae.H.useMemo(e, t);
};
q.useOptimistic = function (e, t) {
  return ae.H.useOptimistic(e, t);
};
q.useReducer = function (e, t, l) {
  return ae.H.useReducer(e, t, l);
};
q.useRef = function (e) {
  return ae.H.useRef(e);
};
q.useState = function (e) {
  return ae.H.useState(e);
};
q.useSyncExternalStore = function (e, t, l) {
  return ae.H.useSyncExternalStore(e, t, l);
};
q.useTransition = function () {
  return ae.H.useTransition();
};
q.version = "19.0.0";
qr.exports = q;
var j = qr.exports;
const Ph = zr(j);
var Gr = { exports: {} },
  wu = {},
  Xr = { exports: {} },
  Zr = {};
/** * @license React * scheduler.production.js * * Copyright (c) Meta Platforms, Inc. and affiliates. * * This source code is licensed under the MIT license found in the * LICENSE file in the root directory of this source tree. */ (function (
  e,
) {
  function t(x, z) {
    var U = x.length;
    x.push(z);
    e: for (; 0 < U; ) {
      var $ = (U - 1) >>> 1,
        O = x[$];
      if (0 < n(O, z)) ((x[$] = z), (x[U] = O), (U = $));
      else break e;
    }
  }
  function l(x) {
    return x.length === 0 ? null : x[0];
  }
  function a(x) {
    if (x.length === 0) return null;
    var z = x[0],
      U = x.pop();
    if (U !== z) {
      x[0] = U;
      e: for (var $ = 0, O = x.length, Y = O >>> 1; $ < Y; ) {
        var Z = 2 * ($ + 1) - 1,
          ue = x[Z],
          M = Z + 1,
          X = x[M];
        if (0 > n(ue, U))
          M < O && 0 > n(X, ue)
            ? ((x[$] = X), (x[M] = U), ($ = M))
            : ((x[$] = ue), (x[Z] = U), ($ = Z));
        else if (M < O && 0 > n(X, U)) ((x[$] = X), (x[M] = U), ($ = M));
        else break e;
      }
    }
    return z;
  }
  function n(x, z) {
    var U = x.sortIndex - z.sortIndex;
    return U !== 0 ? U : x.id - z.id;
  }
  if (
    ((e.unstable_now = void 0),
    typeof performance == "object" && typeof performance.now == "function")
  ) {
    var u = performance;
    e.unstable_now = function () {
      return u.now();
    };
  } else {
    var i = Date,
      s = i.now();
    e.unstable_now = function () {
      return i.now() - s;
    };
  }
  var f = [],
    r = [],
    b = 1,
    y = null,
    h = 3,
    m = !1,
    A = !1,
    N = !1,
    R = typeof setTimeout == "function" ? setTimeout : null,
    o = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  function v(x) {
    for (var z = l(r); z !== null; ) {
      if (z.callback === null) a(r);
      else if (z.startTime <= x)
        (a(r), (z.sortIndex = z.expirationTime), t(f, z));
      else break;
      z = l(r);
    }
  }
  function g(x) {
    if (((N = !1), v(x), !A))
      if (l(f) !== null) ((A = !0), se());
      else {
        var z = l(r);
        z !== null && xe(g, z.startTime - x);
      }
  }
  var E = !1,
    C = -1,
    T = 5,
    D = -1;
  function S() {
    return !(e.unstable_now() - D < T);
  }
  function _() {
    if (E) {
      var x = e.unstable_now();
      D = x;
      var z = !0;
      try {
        e: {
          ((A = !1), N && ((N = !1), o(C), (C = -1)), (m = !0));
          var U = h;
          try {
            t: {
              for (
                v(x), y = l(f);
                y !== null && !(y.expirationTime > x && S());
              ) {
                var $ = y.callback;
                if (typeof $ == "function") {
                  ((y.callback = null), (h = y.priorityLevel));
                  var O = $(y.expirationTime <= x);
                  if (((x = e.unstable_now()), typeof O == "function")) {
                    ((y.callback = O), v(x), (z = !0));
                    break t;
                  }
                  (y === l(f) && a(f), v(x));
                } else a(f);
                y = l(f);
              }
              if (y !== null) z = !0;
              else {
                var Y = l(r);
                (Y !== null && xe(g, Y.startTime - x), (z = !1));
              }
            }
            break e;
          } finally {
            ((y = null), (h = U), (m = !1));
          }
          z = void 0;
        }
      } finally {
        z ? te() : (E = !1);
      }
    }
  }
  var te;
  if (typeof d == "function")
    te = function () {
      d(_);
    };
  else if (typeof MessageChannel < "u") {
    var De = new MessageChannel(),
      Q = De.port2;
    ((De.port1.onmessage = _),
      (te = function () {
        Q.postMessage(null);
      }));
  } else
    te = function () {
      R(_, 0);
    };
  function se() {
    E || ((E = !0), te());
  }
  function xe(x, z) {
    C = R(function () {
      x(e.unstable_now());
    }, z);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (x) {
      x.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      A || m || ((A = !0), se());
    }),
    (e.unstable_forceFrameRate = function (x) {
      0 > x || 125 < x
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (T = 0 < x ? Math.floor(1e3 / x) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return l(f);
    }),
    (e.unstable_next = function (x) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = h;
      }
      var U = h;
      h = z;
      try {
        return x();
      } finally {
        h = U;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (x, z) {
      switch (x) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          x = 3;
      }
      var U = h;
      h = x;
      try {
        return z();
      } finally {
        h = U;
      }
    }),
    (e.unstable_scheduleCallback = function (x, z, U) {
      var $ = e.unstable_now();
      switch (
        (typeof U == "object" && U !== null
          ? ((U = U.delay), (U = typeof U == "number" && 0 < U ? $ + U : $))
          : (U = $),
        x)
      ) {
        case 1:
          var O = -1;
          break;
        case 2:
          O = 250;
          break;
        case 5:
          O = 1073741823;
          break;
        case 4:
          O = 1e4;
          break;
        default:
          O = 5e3;
      }
      return (
        (O = U + O),
        (x = {
          id: b++,
          callback: z,
          priorityLevel: x,
          startTime: U,
          expirationTime: O,
          sortIndex: -1,
        }),
        U > $
          ? ((x.sortIndex = U),
            t(r, x),
            l(f) === null &&
              x === l(r) &&
              (N ? (o(C), (C = -1)) : (N = !0), xe(g, U - $)))
          : ((x.sortIndex = O), t(f, x), A || m || ((A = !0), se())),
        x
      );
    }),
    (e.unstable_shouldYield = S),
    (e.unstable_wrapCallback = function (x) {
      var z = h;
      return function () {
        var U = h;
        h = z;
        try {
          return x.apply(this, arguments);
        } finally {
          h = U;
        }
      };
    }));
})(Zr);
Xr.exports = Zr;
var e0 = Xr.exports,
  kr = { exports: {} },
  Me = {};
/** * @license React * react-dom.production.js * * Copyright (c) Meta Platforms, Inc. and affiliates. * * This source code is licensed under the MIT license found in the * LICENSE file in the root directory of this source tree. */ var t0 =
  j;
function Kr(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      t += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function zt() {}
var Te = {
    d: {
      f: zt,
      r: function () {
        throw Error(Kr(522));
      },
      D: zt,
      C: zt,
      L: zt,
      m: zt,
      X: zt,
      S: zt,
      M: zt,
    },
    p: 0,
    findDOMNode: null,
  },
  l0 = Symbol.for("react.portal");
function a0(e, t, l) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: l0,
    key: a == null ? null : "" + a,
    children: e,
    containerInfo: t,
    implementation: l,
  };
}
var Ba = t0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Vu(e, t) {
  if (e === "font") return "";
  if (typeof t == "string") return t === "use-credentials" ? t : "";
}
Me.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Te;
Me.createPortal = function (e, t) {
  var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
    throw Error(Kr(299));
  return a0(e, t, null, l);
};
Me.flushSync = function (e) {
  var t = Ba.T,
    l = Te.p;
  try {
    if (((Ba.T = null), (Te.p = 2), e)) return e();
  } finally {
    ((Ba.T = t), (Te.p = l), Te.d.f());
  }
};
Me.preconnect = function (e, t) {
  typeof e == "string" &&
    (t
      ? ((t = t.crossOrigin),
        (t =
          typeof t == "string" ? (t === "use-credentials" ? t : "") : void 0))
      : (t = null),
    Te.d.C(e, t));
};
Me.prefetchDNS = function (e) {
  typeof e == "string" && Te.d.D(e);
};
Me.preinit = function (e, t) {
  if (typeof e == "string" && t && typeof t.as == "string") {
    var l = t.as,
      a = Vu(l, t.crossOrigin),
      n = typeof t.integrity == "string" ? t.integrity : void 0,
      u = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    l === "style"
      ? Te.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
          crossOrigin: a,
          integrity: n,
          fetchPriority: u,
        })
      : l === "script" &&
        Te.d.X(e, {
          crossOrigin: a,
          integrity: n,
          fetchPriority: u,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        });
  }
};
Me.preinitModule = function (e, t) {
  if (typeof e == "string")
    if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var l = Vu(t.as, t.crossOrigin);
        Te.d.M(e, {
          crossOrigin: l,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        });
      }
    } else t == null && Te.d.M(e);
};
Me.preload = function (e, t) {
  if (
    typeof e == "string" &&
    typeof t == "object" &&
    t !== null &&
    typeof t.as == "string"
  ) {
    var l = t.as,
      a = Vu(l, t.crossOrigin);
    Te.d.L(e, l, {
      crossOrigin: a,
      integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0,
      type: typeof t.type == "string" ? t.type : void 0,
      fetchPriority:
        typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
      referrerPolicy:
        typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
      imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
      imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
      media: typeof t.media == "string" ? t.media : void 0,
    });
  }
};
Me.preloadModule = function (e, t) {
  if (typeof e == "string")
    if (t) {
      var l = Vu(t.as, t.crossOrigin);
      Te.d.m(e, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: l,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      });
    } else Te.d.m(e);
};
Me.requestFormReset = function (e) {
  Te.d.r(e);
};
Me.unstable_batchedUpdates = function (e, t) {
  return e(t);
};
Me.useFormState = function (e, t, l) {
  return Ba.H.useFormState(e, t, l);
};
Me.useFormStatus = function () {
  return Ba.H.useHostTransitionStatus();
};
Me.version = "19.0.0";
function Jr() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Jr);
    } catch (e) {
      console.error(e);
    }
}
(Jr(), (kr.exports = Me));
var $r = kr.exports;
/** * @license React * react-dom-client.production.js * * Copyright (c) Meta Platforms, Inc. and affiliates. * * This source code is licensed under the MIT license found in the * LICENSE file in the root directory of this source tree. */ var ve =
    e0,
  Wr = j,
  n0 = $r;
function p(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      t += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Fr(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
var u0 = Symbol.for("react.element"),
  Cn = Symbol.for("react.transitional.element"),
  Ra = Symbol.for("react.portal"),
  Vl = Symbol.for("react.fragment"),
  Ir = Symbol.for("react.strict_mode"),
  kc = Symbol.for("react.profiler"),
  c0 = Symbol.for("react.provider"),
  Pr = Symbol.for("react.consumer"),
  At = Symbol.for("react.context"),
  Zi = Symbol.for("react.forward_ref"),
  Kc = Symbol.for("react.suspense"),
  Jc = Symbol.for("react.suspense_list"),
  ki = Symbol.for("react.memo"),
  Lt = Symbol.for("react.lazy"),
  eo = Symbol.for("react.offscreen"),
  i0 = Symbol.for("react.memo_cache_sentinel"),
  Zs = Symbol.iterator;
function xa(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Zs && e[Zs]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var s0 = Symbol.for("react.client.reference");
function $c(e) {
  if (e == null) return null;
  if (typeof e == "function")
    return e.$$typeof === s0 ? null : e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Vl:
      return "Fragment";
    case Ra:
      return "Portal";
    case kc:
      return "Profiler";
    case Ir:
      return "StrictMode";
    case Kc:
      return "Suspense";
    case Jc:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case At:
        return (e.displayName || "Context") + ".Provider";
      case Pr:
        return (e._context.displayName || "Context") + ".Consumer";
      case Zi:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ki:
        return (
          (t = e.displayName || null),
          t !== null ? t : $c(e.type) || "Memo"
        );
      case Lt:
        ((t = e._payload), (e = e._init));
        try {
          return $c(e(t));
        } catch {}
    }
  return null;
}
var H = Wr.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  P = Object.assign,
  ac,
  ks;
function za(e) {
  if (ac === void 0)
    try {
      throw Error();
    } catch (l) {
      var t = l.stack.trim().match(/\n( *(at )?)/);
      ((ac = (t && t[1]) || ""),
        (ks =
          -1 < l.stack.indexOf(`    at`)
            ? " (<anonymous>)"
            : -1 < l.stack.indexOf("@")
              ? "@unknown:0:0"
              : ""));
    }
  return `` + ac + e + ks;
}
var nc = !1;
function uc(e, t) {
  if (!e || nc) return "";
  nc = !0;
  var l = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = {
      DetermineComponentFrameRoot: function () {
        try {
          if (t) {
            var y = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(y.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == "object" && Reflect.construct)
            ) {
              try {
                Reflect.construct(y, []);
              } catch (m) {
                var h = m;
              }
              Reflect.construct(e, [], y);
            } else {
              try {
                y.call();
              } catch (m) {
                h = m;
              }
              e.call(y.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (m) {
              h = m;
            }
            (y = e()) &&
              typeof y.catch == "function" &&
              y.catch(function () {});
          }
        } catch (m) {
          if (m && h && typeof m.stack == "string") return [m.stack, h.stack];
        }
        return [null, null];
      },
    };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var n = Object.getOwnPropertyDescriptor(
      a.DetermineComponentFrameRoot,
      "name",
    );
    n &&
      n.configurable &&
      Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var u = a.DetermineComponentFrameRoot(),
      i = u[0],
      s = u[1];
    if (i && s) {
      var f = i.split(``),
        r = s.split(``);
      for (
        n = a = 0;
        a < f.length && !f[a].includes("DetermineComponentFrameRoot");
      )
        a++;
      for (; n < r.length && !r[n].includes("DetermineComponentFrameRoot"); )
        n++;
      if (a === f.length || n === r.length)
        for (
          a = f.length - 1, n = r.length - 1;
          1 <= a && 0 <= n && f[a] !== r[n];
        )
          n--;
      for (; 1 <= a && 0 <= n; a--, n--)
        if (f[a] !== r[n]) {
          if (a !== 1 || n !== 1)
            do
              if ((a--, n--, 0 > n || f[a] !== r[n])) {
                var b = `` + f[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    b.includes("<anonymous>") &&
                    (b = b.replace("<anonymous>", e.displayName)),
                  b
                );
              }
            while (1 <= a && 0 <= n);
          break;
        }
    }
  } finally {
    ((nc = !1), (Error.prepareStackTrace = l));
  }
  return (l = e ? e.displayName || e.name : "") ? za(l) : "";
}
function f0(e) {
  switch (e.tag) {
    case 26:
    case 27:
    case 5:
      return za(e.type);
    case 16:
      return za("Lazy");
    case 13:
      return za("Suspense");
    case 19:
      return za("SuspenseList");
    case 0:
    case 15:
      return ((e = uc(e.type, !1)), e);
    case 11:
      return ((e = uc(e.type.render, !1)), e);
    case 1:
      return ((e = uc(e.type, !0)), e);
    default:
      return "";
  }
}
function Ks(e) {
  try {
    var t = "";
    do ((t += f0(e)), (e = e.return));
    while (e);
    return t;
  } catch (l) {
    return `Error generating stack: ` + l.message + `` + l.stack;
  }
}
function ba(e) {
  var t = e,
    l = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (l = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? l : null;
}
function to(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Js(e) {
  if (ba(e) !== e) throw Error(p(188));
}
function r0(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = ba(e)), t === null)) throw Error(p(188));
    return t !== e ? null : e;
  }
  for (var l = e, a = t; ; ) {
    var n = l.return;
    if (n === null) break;
    var u = n.alternate;
    if (u === null) {
      if (((a = n.return), a !== null)) {
        l = a;
        continue;
      }
      break;
    }
    if (n.child === u.child) {
      for (u = n.child; u; ) {
        if (u === l) return (Js(n), e);
        if (u === a) return (Js(n), t);
        u = u.sibling;
      }
      throw Error(p(188));
    }
    if (l.return !== a.return) ((l = n), (a = u));
    else {
      for (var i = !1, s = n.child; s; ) {
        if (s === l) {
          ((i = !0), (l = n), (a = u));
          break;
        }
        if (s === a) {
          ((i = !0), (a = n), (l = u));
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = u.child; s; ) {
          if (s === l) {
            ((i = !0), (l = u), (a = n));
            break;
          }
          if (s === a) {
            ((i = !0), (a = u), (l = n));
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(p(189));
      }
    }
    if (l.alternate !== a) throw Error(p(190));
  }
  if (l.tag !== 3) throw Error(p(188));
  return l.stateNode.current === l ? e : t;
}
function lo(e) {
  var t = e.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return e;
  for (e = e.child; e !== null; ) {
    if (((t = lo(e)), t !== null)) return t;
    e = e.sibling;
  }
  return null;
}
var Ua = Array.isArray,
  I = n0.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  vl = { pending: !1, data: null, method: null, action: null },
  Wc = [],
  Ql = -1;
function ht(e) {
  return { current: e };
}
function pe(e) {
  0 > Ql || ((e.current = Wc[Ql]), (Wc[Ql] = null), Ql--);
}
function ee(e, t) {
  (Ql++, (Wc[Ql] = e.current), (e.current = t));
}
var ft = ht(null),
  en = ht(null),
  Zt = ht(null),
  ru = ht(null);
function ou(e, t) {
  switch ((ee(Zt, t), ee(en, e), ee(ft, null), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) && (t = t.namespaceURI) ? Wf(t) : 0;
      break;
    default:
      if (
        ((e = e === 8 ? t.parentNode : t),
        (t = e.tagName),
        (e = e.namespaceURI))
      )
        ((e = Wf(e)), (t = vh(e, t)));
      else
        switch (t) {
          case "svg":
            t = 1;
            break;
          case "math":
            t = 2;
            break;
          default:
            t = 0;
        }
  }
  (pe(ft), ee(ft, t));
}
function ia() {
  (pe(ft), pe(en), pe(Zt));
}
function Fc(e) {
  e.memoizedState !== null && ee(ru, e);
  var t = ft.current,
    l = vh(t, e.type);
  t !== l && (ee(en, e), ee(ft, l));
}
function du(e) {
  (en.current === e && (pe(ft), pe(en)),
    ru.current === e && (pe(ru), (dn._currentValue = vl)));
}
var Ic = Object.prototype.hasOwnProperty,
  Ki = ve.unstable_scheduleCallback,
  cc = ve.unstable_cancelCallback,
  o0 = ve.unstable_shouldYield,
  d0 = ve.unstable_requestPaint,
  rt = ve.unstable_now,
  h0 = ve.unstable_getCurrentPriorityLevel,
  ao = ve.unstable_ImmediatePriority,
  no = ve.unstable_UserBlockingPriority,
  hu = ve.unstable_NormalPriority,
  m0 = ve.unstable_LowPriority,
  uo = ve.unstable_IdlePriority,
  v0 = ve.log,
  y0 = ve.unstable_setDisableYieldValue,
  bn = null,
  Le = null;
function b0(e) {
  if (Le && typeof Le.onCommitFiberRoot == "function")
    try {
      Le.onCommitFiberRoot(bn, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
function Gt(e) {
  if (
    (typeof v0 == "function" && y0(e),
    Le && typeof Le.setStrictMode == "function")
  )
    try {
      Le.setStrictMode(bn, e);
    } catch {}
}
var Be = Math.clz32 ? Math.clz32 : _0,
  g0 = Math.log,
  p0 = Math.LN2;
function _0(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((g0(e) / p0) | 0)) | 0);
}
var Rn = 128,
  zn = 4194304;
function fl(e) {
  var t = e & 42;
  if (t !== 0) return t;
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194176;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return e & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return e;
  }
}
function Qu(e, t) {
  var l = e.pendingLanes;
  if (l === 0) return 0;
  var a = 0,
    n = e.suspendedLanes,
    u = e.pingedLanes,
    i = e.warmLanes;
  e = e.finishedLanes !== 0;
  var s = l & 134217727;
  return (
    s !== 0
      ? ((l = s & ~n),
        l !== 0
          ? (a = fl(l))
          : ((u &= s),
            u !== 0
              ? (a = fl(u))
              : e || ((i = s & ~i), i !== 0 && (a = fl(i)))))
      : ((s = l & ~n),
        s !== 0
          ? (a = fl(s))
          : u !== 0
            ? (a = fl(u))
            : e || ((i = l & ~i), i !== 0 && (a = fl(i)))),
    a === 0
      ? 0
      : t !== 0 &&
          t !== a &&
          !(t & n) &&
          ((n = a & -a),
          (i = t & -t),
          n >= i || (n === 32 && (i & 4194176) !== 0))
        ? t
        : a
  );
}
function gn(e, t) {
  return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
}
function S0(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
    case 8:
      return t + 250;
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function co() {
  var e = Rn;
  return ((Rn <<= 1), !(Rn & 4194176) && (Rn = 128), e);
}
function io() {
  var e = zn;
  return ((zn <<= 1), !(zn & 62914560) && (zn = 4194304), e);
}
function ic(e) {
  for (var t = [], l = 0; 31 > l; l++) t.push(e);
  return t;
}
function pn(e, t) {
  ((e.pendingLanes |= t),
    t !== 268435456 &&
      ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
}
function A0(e, t, l, a, n, u) {
  var i = e.pendingLanes;
  ((e.pendingLanes = l),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.warmLanes = 0),
    (e.expiredLanes &= l),
    (e.entangledLanes &= l),
    (e.errorRecoveryDisabledLanes &= l),
    (e.shellSuspendCounter = 0));
  var s = e.entanglements,
    f = e.expirationTimes,
    r = e.hiddenUpdates;
  for (l = i & ~l; 0 < l; ) {
    var b = 31 - Be(l),
      y = 1 << b;
    ((s[b] = 0), (f[b] = -1));
    var h = r[b];
    if (h !== null)
      for (r[b] = null, b = 0; b < h.length; b++) {
        var m = h[b];
        m !== null && (m.lane &= -536870913);
      }
    l &= ~y;
  }
  (a !== 0 && so(e, a, 0),
    u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(i & ~t)));
}
function so(e, t, l) {
  ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
  var a = 31 - Be(t);
  ((e.entangledLanes |= t),
    (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 4194218)));
}
function fo(e, t) {
  var l = (e.entangledLanes |= t);
  for (e = e.entanglements; l; ) {
    var a = 31 - Be(l),
      n = 1 << a;
    ((n & t) | (e[a] & t) && (e[a] |= t), (l &= ~n));
  }
}
function ro(e) {
  return (
    (e &= -e),
    2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2
  );
}
function oo() {
  var e = I.p;
  return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Nh(e.type));
}
function x0(e, t) {
  var l = I.p;
  try {
    return ((I.p = e), t());
  } finally {
    I.p = l;
  }
}
var ul = Math.random().toString(36).slice(2),
  Ee = "__reactFiber$" + ul,
  Re = "__reactProps$" + ul,
  ga = "__reactContainer$" + ul,
  Pc = "__reactEvents$" + ul,
  E0 = "__reactListeners$" + ul,
  N0 = "__reactHandles$" + ul,
  $s = "__reactResources$" + ul,
  tn = "__reactMarker$" + ul;
function Ji(e) {
  (delete e[Ee], delete e[Re], delete e[Pc], delete e[E0], delete e[N0]);
}
function hl(e) {
  var t = e[Ee];
  if (t) return t;
  for (var l = e.parentNode; l; ) {
    if ((t = l[ga] || l[Ee])) {
      if (
        ((l = t.alternate),
        t.child !== null || (l !== null && l.child !== null))
      )
        for (e = If(e); e !== null; ) {
          if ((l = e[Ee])) return l;
          e = If(e);
        }
      return t;
    }
    ((e = l), (l = e.parentNode));
  }
  return null;
}
function pa(e) {
  if ((e = e[Ee] || e[ga])) {
    var t = e.tag;
    if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
      return e;
  }
  return null;
}
function Ha(e) {
  var t = e.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
  throw Error(p(33));
}
function Pl(e) {
  var t = e[$s];
  return (
    t ||
      (t = e[$s] = { hoistableStyles: new Map(), hoistableScripts: new Map() }),
    t
  );
}
function be(e) {
  e[tn] = !0;
}
var ho = new Set(),
  mo = {};
function jl(e, t) {
  (sa(e, t), sa(e + "Capture", t));
}
function sa(e, t) {
  for (mo[e] = t, e = 0; e < t.length; e++) ho.add(t[e]);
}
var Ot = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  j0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
  ),
  Ws = {},
  Fs = {};
function T0(e) {
  return Ic.call(Fs, e)
    ? !0
    : Ic.call(Ws, e)
      ? !1
      : j0.test(e)
        ? (Fs[e] = !0)
        : ((Ws[e] = !0), !1);
}
function Wn(e, t, l) {
  if (T0(t))
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(t);
          return;
        case "boolean":
          var a = t.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            e.removeAttribute(t);
            return;
          }
      }
      e.setAttribute(t, "" + l);
    }
}
function Un(e, t, l) {
  if (l === null) e.removeAttribute(t);
  else {
    switch (typeof l) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        e.removeAttribute(t);
        return;
    }
    e.setAttribute(t, "" + l);
  }
}
function vt(e, t, l, a) {
  if (a === null) e.removeAttribute(l);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        e.removeAttribute(l);
        return;
    }
    e.setAttributeNS(t, l, "" + a);
  }
}
function Xe(e) {
  switch (typeof e) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function vo(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function O0(e) {
  var t = vo(e) ? "checked" : "value",
    l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    a = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof l < "u" &&
    typeof l.get == "function" &&
    typeof l.set == "function"
  ) {
    var n = l.get,
      u = l.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return n.call(this);
        },
        set: function (i) {
          ((a = "" + i), u.call(this, i));
        },
      }),
      Object.defineProperty(e, t, { enumerable: l.enumerable }),
      {
        getValue: function () {
          return a;
        },
        setValue: function (i) {
          a = "" + i;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function mu(e) {
  e._valueTracker || (e._valueTracker = O0(e));
}
function yo(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var l = t.getValue(),
    a = "";
  return (
    e && (a = vo(e) ? (e.checked ? "true" : "false") : e.value),
    (e = a),
    e !== l ? (t.setValue(e), !0) : !1
  );
}
function vu(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
var M0 = /[\n"\\]/g;
function Ke(e) {
  return e.replace(M0, function (t) {
    return "\\" + t.charCodeAt(0).toString(16) + " ";
  });
}
function ei(e, t, l, a, n, u, i, s) {
  ((e.name = ""),
    i != null &&
    typeof i != "function" &&
    typeof i != "symbol" &&
    typeof i != "boolean"
      ? (e.type = i)
      : e.removeAttribute("type"),
    t != null
      ? i === "number"
        ? ((t === 0 && e.value === "") || e.value != t) &&
          (e.value = "" + Xe(t))
        : e.value !== "" + Xe(t) && (e.value = "" + Xe(t))
      : (i !== "submit" && i !== "reset") || e.removeAttribute("value"),
    t != null
      ? ti(e, i, Xe(t))
      : l != null
        ? ti(e, i, Xe(l))
        : a != null && e.removeAttribute("value"),
    n == null && u != null && (e.defaultChecked = !!u),
    n != null &&
      (e.checked = n && typeof n != "function" && typeof n != "symbol"),
    s != null &&
    typeof s != "function" &&
    typeof s != "symbol" &&
    typeof s != "boolean"
      ? (e.name = "" + Xe(s))
      : e.removeAttribute("name"));
}
function bo(e, t, l, a, n, u, i, s) {
  if (
    (u != null &&
      typeof u != "function" &&
      typeof u != "symbol" &&
      typeof u != "boolean" &&
      (e.type = u),
    t != null || l != null)
  ) {
    if (!((u !== "submit" && u !== "reset") || t != null)) return;
    ((l = l != null ? "" + Xe(l) : ""),
      (t = t != null ? "" + Xe(t) : l),
      s || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((a = a ?? n),
    (a = typeof a != "function" && typeof a != "symbol" && !!a),
    (e.checked = s ? e.checked : !!a),
    (e.defaultChecked = !!a),
    i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean" &&
      (e.name = i));
}
function ti(e, t, l) {
  (t === "number" && vu(e.ownerDocument) === e) ||
    e.defaultValue === "" + l ||
    (e.defaultValue = "" + l);
}
function ea(e, t, l, a) {
  if (((e = e.options), t)) {
    t = {};
    for (var n = 0; n < l.length; n++) t["$" + l[n]] = !0;
    for (l = 0; l < e.length; l++)
      ((n = t.hasOwnProperty("$" + e[l].value)),
        e[l].selected !== n && (e[l].selected = n),
        n && a && (e[l].defaultSelected = !0));
  } else {
    for (l = "" + Xe(l), t = null, n = 0; n < e.length; n++) {
      if (e[n].value === l) {
        ((e[n].selected = !0), a && (e[n].defaultSelected = !0));
        return;
      }
      t !== null || e[n].disabled || (t = e[n]);
    }
    t !== null && (t.selected = !0);
  }
}
function go(e, t, l) {
  if (
    t != null &&
    ((t = "" + Xe(t)), t !== e.value && (e.value = t), l == null)
  ) {
    e.defaultValue !== t && (e.defaultValue = t);
    return;
  }
  e.defaultValue = l != null ? "" + Xe(l) : "";
}
function po(e, t, l, a) {
  if (t == null) {
    if (a != null) {
      if (l != null) throw Error(p(92));
      if (Ua(a)) {
        if (1 < a.length) throw Error(p(93));
        a = a[0];
      }
      l = a;
    }
    (l == null && (l = ""), (t = l));
  }
  ((l = Xe(t)),
    (e.defaultValue = l),
    (a = e.textContent),
    a === l && a !== "" && a !== null && (e.value = a));
}
function fa(e, t) {
  if (t) {
    var l = e.firstChild;
    if (l && l === e.lastChild && l.nodeType === 3) {
      l.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var D0 = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " ",
  ),
);
function Is(e, t, l) {
  var a = t.indexOf("--") === 0;
  l == null || typeof l == "boolean" || l === ""
    ? a
      ? e.setProperty(t, "")
      : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
    : a
      ? e.setProperty(t, l)
      : typeof l != "number" || l === 0 || D0.has(t)
        ? t === "float"
          ? (e.cssFloat = l)
          : (e[t] = ("" + l).trim())
        : (e[t] = l + "px");
}
function _o(e, t, l) {
  if (t != null && typeof t != "object") throw Error(p(62));
  if (((e = e.style), l != null)) {
    for (var a in l)
      !l.hasOwnProperty(a) ||
        (t != null && t.hasOwnProperty(a)) ||
        (a.indexOf("--") === 0
          ? e.setProperty(a, "")
          : a === "float"
            ? (e.cssFloat = "")
            : (e[a] = ""));
    for (var n in t)
      ((a = t[n]), t.hasOwnProperty(n) && l[n] !== a && Is(e, n, a));
  } else for (var u in t) t.hasOwnProperty(u) && Is(e, u, t[u]);
}
function $i(e) {
  if (e.indexOf("-") === -1) return !1;
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var C0 = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  R0 =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Fn(e) {
  return R0.test("" + e)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : e;
}
var li = null;
function Wi(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Gl = null,
  ta = null;
function Ps(e) {
  var t = pa(e);
  if (t && (e = t.stateNode)) {
    var l = e[Re] || null;
    e: switch (((e = t.stateNode), t.type)) {
      case "input":
        if (
          (ei(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
          ),
          (t = l.name),
          l.type === "radio" && t != null)
        ) {
          for (l = e; l.parentNode; ) l = l.parentNode;
          for (
            l = l.querySelectorAll(
              'input[name="' + Ke("" + t) + '"][type="radio"]',
            ),
              t = 0;
            t < l.length;
            t++
          ) {
            var a = l[t];
            if (a !== e && a.form === e.form) {
              var n = a[Re] || null;
              if (!n) throw Error(p(90));
              ei(
                a,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name,
              );
            }
          }
          for (t = 0; t < l.length; t++)
            ((a = l[t]), a.form === e.form && yo(a));
        }
        break e;
      case "textarea":
        go(e, l.value, l.defaultValue);
        break e;
      case "select":
        ((t = l.value), t != null && ea(e, !!l.multiple, t, !1));
    }
  }
}
var sc = !1;
function So(e, t, l) {
  if (sc) return e(t, l);
  sc = !0;
  try {
    var a = e(t);
    return a;
  } finally {
    if (
      ((sc = !1),
      (Gl !== null || ta !== null) &&
        (Iu(), Gl && ((t = Gl), (e = ta), (ta = Gl = null), Ps(t), e)))
    )
      for (t = 0; t < e.length; t++) Ps(e[t]);
  }
}
function ln(e, t) {
  var l = e.stateNode;
  if (l === null) return null;
  var a = l[Re] || null;
  if (a === null) return null;
  l = a[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((a = !a.disabled) ||
        ((e = e.type),
        (a = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !a));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (l && typeof l != "function") throw Error(p(231, t, typeof l));
  return l;
}
var ai = !1;
if (Ot)
  try {
    var Ea = {};
    (Object.defineProperty(Ea, "passive", {
      get: function () {
        ai = !0;
      },
    }),
      window.addEventListener("test", Ea, Ea),
      window.removeEventListener("test", Ea, Ea));
  } catch {
    ai = !1;
  }
var Xt = null,
  Fi = null,
  In = null;
function Ao() {
  if (In) return In;
  var e,
    t = Fi,
    l = t.length,
    a,
    n = "value" in Xt ? Xt.value : Xt.textContent,
    u = n.length;
  for (e = 0; e < l && t[e] === n[e]; e++);
  var i = l - e;
  for (a = 1; a <= i && t[l - a] === n[u - a]; a++);
  return (In = n.slice(e, 1 < a ? 1 - a : void 0));
}
function Pn(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Hn() {
  return !0;
}
function ef() {
  return !1;
}
function ze(e) {
  function t(l, a, n, u, i) {
    ((this._reactName = l),
      (this._targetInst = n),
      (this.type = a),
      (this.nativeEvent = u),
      (this.target = i),
      (this.currentTarget = null));
    for (var s in e)
      e.hasOwnProperty(s) && ((l = e[s]), (this[s] = l ? l(u) : u[s]));
    return (
      (this.isDefaultPrevented = (
        u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
      )
        ? Hn
        : ef),
      (this.isPropagationStopped = ef),
      this
    );
  }
  return (
    P(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l &&
          (l.preventDefault
            ? l.preventDefault()
            : typeof l.returnValue != "unknown" && (l.returnValue = !1),
          (this.isDefaultPrevented = Hn));
      },
      stopPropagation: function () {
        var l = this.nativeEvent;
        l &&
          (l.stopPropagation
            ? l.stopPropagation()
            : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
          (this.isPropagationStopped = Hn));
      },
      persist: function () {},
      isPersistent: Hn,
    }),
    t
  );
}
var Tl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Gu = ze(Tl),
  _n = P({}, Tl, { view: 0, detail: 0 }),
  z0 = ze(_n),
  fc,
  rc,
  Na,
  Xu = P({}, _n, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ii,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Na &&
            (Na && e.type === "mousemove"
              ? ((fc = e.screenX - Na.screenX), (rc = e.screenY - Na.screenY))
              : (rc = fc = 0),
            (Na = e)),
          fc);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : rc;
    },
  }),
  tf = ze(Xu),
  U0 = P({}, Xu, { dataTransfer: 0 }),
  H0 = ze(U0),
  q0 = P({}, _n, { relatedTarget: 0 }),
  oc = ze(q0),
  L0 = P({}, Tl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  B0 = ze(L0),
  Y0 = P({}, Tl, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  w0 = ze(Y0),
  V0 = P({}, Tl, { data: 0 }),
  lf = ze(V0),
  Q0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  G0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  X0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Z0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = X0[e]) ? !!t[e] : !1;
}
function Ii() {
  return Z0;
}
var k0 = P({}, _n, {
    key: function (e) {
      if (e.key) {
        var t = Q0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Pn(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? G0[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ii,
    charCode: function (e) {
      return e.type === "keypress" ? Pn(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Pn(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  K0 = ze(k0),
  J0 = P({}, Xu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  af = ze(J0),
  $0 = P({}, _n, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ii,
  }),
  W0 = ze($0),
  F0 = P({}, Tl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  I0 = ze(F0),
  P0 = P({}, Xu, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  em = ze(P0),
  tm = P({}, Tl, { newState: 0, oldState: 0 }),
  lm = ze(tm),
  am = [9, 13, 27, 32],
  Pi = Ot && "CompositionEvent" in window,
  Ya = null;
Ot && "documentMode" in document && (Ya = document.documentMode);
var nm = Ot && "TextEvent" in window && !Ya,
  xo = Ot && (!Pi || (Ya && 8 < Ya && 11 >= Ya)),
  nf = " ",
  uf = !1;
function Eo(e, t) {
  switch (e) {
    case "keyup":
      return am.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function No(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Xl = !1;
function um(e, t) {
  switch (e) {
    case "compositionend":
      return No(t);
    case "keypress":
      return t.which !== 32 ? null : ((uf = !0), nf);
    case "textInput":
      return ((e = t.data), e === nf && uf ? null : e);
    default:
      return null;
  }
}
function cm(e, t) {
  if (Xl)
    return e === "compositionend" || (!Pi && Eo(e, t))
      ? ((e = Ao()), (In = Fi = Xt = null), (Xl = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return xo && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var im = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function cf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!im[e.type] : t === "textarea";
}
function jo(e, t, l, a) {
  (Gl ? (ta ? ta.push(a) : (ta = [a])) : (Gl = a),
    (t = Cu(t, "onChange")),
    0 < t.length &&
      ((l = new Gu("onChange", "change", null, l, a)),
      e.push({ event: l, listeners: t })));
}
var wa = null,
  an = null;
function sm(e) {
  dh(e, 0);
}
function Zu(e) {
  var t = Ha(e);
  if (yo(t)) return e;
}
function sf(e, t) {
  if (e === "change") return t;
}
var To = !1;
if (Ot) {
  var dc;
  if (Ot) {
    var hc = "oninput" in document;
    if (!hc) {
      var ff = document.createElement("div");
      (ff.setAttribute("oninput", "return;"),
        (hc = typeof ff.oninput == "function"));
    }
    dc = hc;
  } else dc = !1;
  To = dc && (!document.documentMode || 9 < document.documentMode);
}
function rf() {
  wa && (wa.detachEvent("onpropertychange", Oo), (an = wa = null));
}
function Oo(e) {
  if (e.propertyName === "value" && Zu(an)) {
    var t = [];
    (jo(t, an, e, Wi(e)), So(sm, t));
  }
}
function fm(e, t, l) {
  e === "focusin"
    ? (rf(), (wa = t), (an = l), wa.attachEvent("onpropertychange", Oo))
    : e === "focusout" && rf();
}
function rm(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Zu(an);
}
function om(e, t) {
  if (e === "click") return Zu(t);
}
function dm(e, t) {
  if (e === "input" || e === "change") return Zu(t);
}
function hm(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var we = typeof Object.is == "function" ? Object.is : hm;
function nn(e, t) {
  if (we(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var l = Object.keys(e),
    a = Object.keys(t);
  if (l.length !== a.length) return !1;
  for (a = 0; a < l.length; a++) {
    var n = l[a];
    if (!Ic.call(t, n) || !we(e[n], t[n])) return !1;
  }
  return !0;
}
function of(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function df(e, t) {
  var l = of(e);
  e = 0;
  for (var a; l; ) {
    if (l.nodeType === 3) {
      if (((a = e + l.textContent.length), e <= t && a >= t))
        return { node: l, offset: t - e };
      e = a;
    }
    e: {
      for (; l; ) {
        if (l.nextSibling) {
          l = l.nextSibling;
          break e;
        }
        l = l.parentNode;
      }
      l = void 0;
    }
    l = of(l);
  }
}
function Mo(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Mo(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Do(e) {
  e =
    e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
      ? e.ownerDocument.defaultView
      : window;
  for (var t = vu(e.document); t instanceof e.HTMLIFrameElement; ) {
    try {
      var l = typeof t.contentWindow.location.href == "string";
    } catch {
      l = !1;
    }
    if (l) e = t.contentWindow;
    else break;
    t = vu(e.document);
  }
  return t;
}
function es(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function mm(e, t) {
  var l = Do(t);
  t = e.focusedElem;
  var a = e.selectionRange;
  if (
    l !== t &&
    t &&
    t.ownerDocument &&
    Mo(t.ownerDocument.documentElement, t)
  ) {
    if (a !== null && es(t)) {
      if (
        ((e = a.start),
        (l = a.end),
        l === void 0 && (l = e),
        "selectionStart" in t)
      )
        ((t.selectionStart = e),
          (t.selectionEnd = Math.min(l, t.value.length)));
      else if (
        ((l = ((e = t.ownerDocument || document) && e.defaultView) || window),
        l.getSelection)
      ) {
        l = l.getSelection();
        var n = t.textContent.length,
          u = Math.min(a.start, n);
        ((a = a.end === void 0 ? u : Math.min(a.end, n)),
          !l.extend && u > a && ((n = a), (a = u), (u = n)),
          (n = df(t, u)));
        var i = df(t, a);
        n &&
          i &&
          (l.rangeCount !== 1 ||
            l.anchorNode !== n.node ||
            l.anchorOffset !== n.offset ||
            l.focusNode !== i.node ||
            l.focusOffset !== i.offset) &&
          ((e = e.createRange()),
          e.setStart(n.node, n.offset),
          l.removeAllRanges(),
          u > a
            ? (l.addRange(e), l.extend(i.node, i.offset))
            : (e.setEnd(i.node, i.offset), l.addRange(e)));
      }
    }
    for (e = [], l = t; (l = l.parentNode); )
      l.nodeType === 1 &&
        e.push({ element: l, left: l.scrollLeft, top: l.scrollTop });
    for (typeof t.focus == "function" && t.focus(), t = 0; t < e.length; t++)
      ((l = e[t]),
        (l.element.scrollLeft = l.left),
        (l.element.scrollTop = l.top));
  }
}
var vm = Ot && "documentMode" in document && 11 >= document.documentMode,
  Zl = null,
  ni = null,
  Va = null,
  ui = !1;
function hf(e, t, l) {
  var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
  ui ||
    Zl == null ||
    Zl !== vu(a) ||
    ((a = Zl),
    "selectionStart" in a && es(a)
      ? (a = { start: a.selectionStart, end: a.selectionEnd })
      : ((a = (
          (a.ownerDocument && a.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (a = {
          anchorNode: a.anchorNode,
          anchorOffset: a.anchorOffset,
          focusNode: a.focusNode,
          focusOffset: a.focusOffset,
        })),
    (Va && nn(Va, a)) ||
      ((Va = a),
      (a = Cu(ni, "onSelect")),
      0 < a.length &&
        ((t = new Gu("onSelect", "select", null, t, l)),
        e.push({ event: t, listeners: a }),
        (t.target = Zl))));
}
function sl(e, t) {
  var l = {};
  return (
    (l[e.toLowerCase()] = t.toLowerCase()),
    (l["Webkit" + e] = "webkit" + t),
    (l["Moz" + e] = "moz" + t),
    l
  );
}
var kl = {
    animationend: sl("Animation", "AnimationEnd"),
    animationiteration: sl("Animation", "AnimationIteration"),
    animationstart: sl("Animation", "AnimationStart"),
    transitionrun: sl("Transition", "TransitionRun"),
    transitionstart: sl("Transition", "TransitionStart"),
    transitioncancel: sl("Transition", "TransitionCancel"),
    transitionend: sl("Transition", "TransitionEnd"),
  },
  mc = {},
  Co = {};
Ot &&
  ((Co = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete kl.animationend.animation,
    delete kl.animationiteration.animation,
    delete kl.animationstart.animation),
  "TransitionEvent" in window || delete kl.transitionend.transition);
function Ol(e) {
  if (mc[e]) return mc[e];
  if (!kl[e]) return e;
  var t = kl[e],
    l;
  for (l in t) if (t.hasOwnProperty(l) && l in Co) return (mc[e] = t[l]);
  return e;
}
var Ro = Ol("animationend"),
  zo = Ol("animationiteration"),
  Uo = Ol("animationstart"),
  ym = Ol("transitionrun"),
  bm = Ol("transitionstart"),
  gm = Ol("transitioncancel"),
  Ho = Ol("transitionend"),
  qo = new Map(),
  mf =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
      " ",
    );
function ut(e, t) {
  (qo.set(e, t), jl(t, [e]));
}
var Ge = [],
  Kl = 0,
  ts = 0;
function ku() {
  for (var e = Kl, t = (ts = Kl = 0); t < e; ) {
    var l = Ge[t];
    Ge[t++] = null;
    var a = Ge[t];
    Ge[t++] = null;
    var n = Ge[t];
    Ge[t++] = null;
    var u = Ge[t];
    if (((Ge[t++] = null), a !== null && n !== null)) {
      var i = a.pending;
      (i === null ? (n.next = n) : ((n.next = i.next), (i.next = n)),
        (a.pending = n));
    }
    u !== 0 && Lo(l, n, u);
  }
}
function Ku(e, t, l, a) {
  ((Ge[Kl++] = e),
    (Ge[Kl++] = t),
    (Ge[Kl++] = l),
    (Ge[Kl++] = a),
    (ts |= a),
    (e.lanes |= a),
    (e = e.alternate),
    e !== null && (e.lanes |= a));
}
function ls(e, t, l, a) {
  return (Ku(e, t, l, a), yu(e));
}
function el(e, t) {
  return (Ku(e, null, null, t), yu(e));
}
function Lo(e, t, l) {
  e.lanes |= l;
  var a = e.alternate;
  a !== null && (a.lanes |= l);
  for (var n = !1, u = e.return; u !== null; )
    ((u.childLanes |= l),
      (a = u.alternate),
      a !== null && (a.childLanes |= l),
      u.tag === 22 &&
        ((e = u.stateNode), e === null || e._visibility & 1 || (n = !0)),
      (e = u),
      (u = u.return));
  n &&
    t !== null &&
    e.tag === 3 &&
    ((u = e.stateNode),
    (n = 31 - Be(l)),
    (u = u.hiddenUpdates),
    (e = u[n]),
    e === null ? (u[n] = [t]) : e.push(t),
    (t.lane = l | 536870912));
}
function yu(e) {
  if (50 < Pa) throw ((Pa = 0), (Ti = null), Error(p(185)));
  for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
  return e.tag === 3 ? e.stateNode : null;
}
var Jl = {},
  vf = new WeakMap();
function Je(e, t) {
  if (typeof e == "object" && e !== null) {
    var l = vf.get(e);
    return l !== void 0
      ? l
      : ((t = { value: e, source: t, stack: Ks(t) }), vf.set(e, t), t);
  }
  return { value: e, source: t, stack: Ks(t) };
}
var $l = [],
  Wl = 0,
  bu = null,
  gu = 0,
  Ze = [],
  ke = 0,
  yl = null,
  xt = 1,
  Et = "";
function rl(e, t) {
  (($l[Wl++] = gu), ($l[Wl++] = bu), (bu = e), (gu = t));
}
function Bo(e, t, l) {
  ((Ze[ke++] = xt), (Ze[ke++] = Et), (Ze[ke++] = yl), (yl = e));
  var a = xt;
  e = Et;
  var n = 32 - Be(a) - 1;
  ((a &= ~(1 << n)), (l += 1));
  var u = 32 - Be(t) + n;
  if (30 < u) {
    var i = n - (n % 5);
    ((u = (a & ((1 << i) - 1)).toString(32)),
      (a >>= i),
      (n -= i),
      (xt = (1 << (32 - Be(t) + n)) | (l << n) | a),
      (Et = u + e));
  } else ((xt = (1 << u) | (l << n) | a), (Et = e));
}
function as(e) {
  e.return !== null && (rl(e, 1), Bo(e, 1, 0));
}
function ns(e) {
  for (; e === bu; )
    ((bu = $l[--Wl]), ($l[Wl] = null), (gu = $l[--Wl]), ($l[Wl] = null));
  for (; e === yl; )
    ((yl = Ze[--ke]),
      (Ze[ke] = null),
      (Et = Ze[--ke]),
      (Ze[ke] = null),
      (xt = Ze[--ke]),
      (Ze[ke] = null));
}
var je = null,
  Se = null,
  G = !1,
  lt = null,
  it = !1,
  ci = Error(p(519));
function Sl(e) {
  var t = Error(p(418, ""));
  throw (un(Je(t, e)), ci);
}
function yf(e) {
  var t = e.stateNode,
    l = e.type,
    a = e.memoizedProps;
  switch (((t[Ee] = e), (t[Re] = a), l)) {
    case "dialog":
      (w("cancel", t), w("close", t));
      break;
    case "iframe":
    case "object":
    case "embed":
      w("load", t);
      break;
    case "video":
    case "audio":
      for (l = 0; l < fn.length; l++) w(fn[l], t);
      break;
    case "source":
      w("error", t);
      break;
    case "img":
    case "image":
    case "link":
      (w("error", t), w("load", t));
      break;
    case "details":
      w("toggle", t);
      break;
    case "input":
      (w("invalid", t),
        bo(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0,
        ),
        mu(t));
      break;
    case "select":
      w("invalid", t);
      break;
    case "textarea":
      (w("invalid", t), po(t, a.value, a.defaultValue, a.children), mu(t));
  }
  ((l = a.children),
    (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
    t.textContent === "" + l ||
    a.suppressHydrationWarning === !0 ||
    mh(t.textContent, l)
      ? (a.popover != null && (w("beforetoggle", t), w("toggle", t)),
        a.onScroll != null && w("scroll", t),
        a.onScrollEnd != null && w("scrollend", t),
        a.onClick != null && (t.onclick = ec),
        (t = !0))
      : (t = !1),
    t || Sl(e));
}
function bf(e) {
  for (je = e.return; je; )
    switch (je.tag) {
      case 3:
      case 27:
        it = !0;
        return;
      case 5:
      case 13:
        it = !1;
        return;
      default:
        je = je.return;
    }
}
function ja(e) {
  if (e !== je) return !1;
  if (!G) return (bf(e), (G = !0), !1);
  var t = !1,
    l;
  if (
    ((l = e.tag !== 3 && e.tag !== 27) &&
      ((l = e.tag === 5) &&
        ((l = e.type),
        (l = !(l !== "form" && l !== "button") || Ui(e.type, e.memoizedProps))),
      (l = !l)),
    l && (t = !0),
    t && Se && Sl(e),
    bf(e),
    e.tag === 13)
  ) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(p(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8)
          if (((l = e.data), l === "/$")) {
            if (t === 0) {
              Se = at(e.nextSibling);
              break e;
            }
            t--;
          } else (l !== "$" && l !== "$!" && l !== "$?") || t++;
        e = e.nextSibling;
      }
      Se = null;
    }
  } else Se = je ? at(e.stateNode.nextSibling) : null;
  return !0;
}
function Sn() {
  ((Se = je = null), (G = !1));
}
function un(e) {
  lt === null ? (lt = [e]) : lt.push(e);
}
var Qa = Error(p(460)),
  Yo = Error(p(474)),
  ii = { then: function () {} };
function gf(e) {
  return ((e = e.status), e === "fulfilled" || e === "rejected");
}
function qn() {}
function wo(e, t, l) {
  switch (
    ((l = e[l]),
    l === void 0 ? e.push(t) : l !== t && (t.then(qn, qn), (t = l)),
    t.status)
  ) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw ((e = t.reason), e === Qa ? Error(p(483)) : e);
    default:
      if (typeof t.status == "string") t.then(qn, qn);
      else {
        if (((e = F), e !== null && 100 < e.shellSuspendCounter))
          throw Error(p(482));
        ((e = t),
          (e.status = "pending"),
          e.then(
            function (a) {
              if (t.status === "pending") {
                var n = t;
                ((n.status = "fulfilled"), (n.value = a));
              }
            },
            function (a) {
              if (t.status === "pending") {
                var n = t;
                ((n.status = "rejected"), (n.reason = a));
              }
            },
          ));
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw ((e = t.reason), e === Qa ? Error(p(483)) : e);
      }
      throw ((Ga = t), Qa);
  }
}
var Ga = null;
function pf() {
  if (Ga === null) throw Error(p(459));
  var e = Ga;
  return ((Ga = null), e);
}
var la = null,
  cn = 0;
function Ln(e) {
  var t = cn;
  return ((cn += 1), la === null && (la = []), wo(la, e, t));
}
function Ta(e, t) {
  ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
}
function Bn(e, t) {
  throw t.$$typeof === u0
    ? Error(p(525))
    : ((e = Object.prototype.toString.call(t)),
      Error(
        p(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      ));
}
function _f(e) {
  var t = e._init;
  return t(e._payload);
}
function Vo(e) {
  function t(o, d) {
    if (e) {
      var v = o.deletions;
      v === null ? ((o.deletions = [d]), (o.flags |= 16)) : v.push(d);
    }
  }
  function l(o, d) {
    if (!e) return null;
    for (; d !== null; ) (t(o, d), (d = d.sibling));
    return null;
  }
  function a(o) {
    for (var d = new Map(); o !== null; )
      (o.key !== null ? d.set(o.key, o) : d.set(o.index, o), (o = o.sibling));
    return d;
  }
  function n(o, d) {
    return ((o = Jt(o, d)), (o.index = 0), (o.sibling = null), o);
  }
  function u(o, d, v) {
    return (
      (o.index = v),
      e
        ? ((v = o.alternate),
          v !== null
            ? ((v = v.index), v < d ? ((o.flags |= 33554434), d) : v)
            : ((o.flags |= 33554434), d))
        : ((o.flags |= 1048576), d)
    );
  }
  function i(o) {
    return (e && o.alternate === null && (o.flags |= 33554434), o);
  }
  function s(o, d, v, g) {
    return d === null || d.tag !== 6
      ? ((d = jc(v, o.mode, g)), (d.return = o), d)
      : ((d = n(d, v)), (d.return = o), d);
  }
  function f(o, d, v, g) {
    var E = v.type;
    return E === Vl
      ? b(o, d, v.props.children, g, v.key)
      : d !== null &&
          (d.elementType === E ||
            (typeof E == "object" &&
              E !== null &&
              E.$$typeof === Lt &&
              _f(E) === d.type))
        ? ((d = n(d, v.props)), Ta(d, v), (d.return = o), d)
        : ((d = nu(v.type, v.key, v.props, null, o.mode, g)),
          Ta(d, v),
          (d.return = o),
          d);
  }
  function r(o, d, v, g) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== v.containerInfo ||
      d.stateNode.implementation !== v.implementation
      ? ((d = Tc(v, o.mode, g)), (d.return = o), d)
      : ((d = n(d, v.children || [])), (d.return = o), d);
  }
  function b(o, d, v, g, E) {
    return d === null || d.tag !== 7
      ? ((d = gl(v, o.mode, g, E)), (d.return = o), d)
      : ((d = n(d, v)), (d.return = o), d);
  }
  function y(o, d, v) {
    if (
      (typeof d == "string" && d !== "") ||
      typeof d == "number" ||
      typeof d == "bigint"
    )
      return ((d = jc("" + d, o.mode, v)), (d.return = o), d);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Cn:
          return (
            (v = nu(d.type, d.key, d.props, null, o.mode, v)),
            Ta(v, d),
            (v.return = o),
            v
          );
        case Ra:
          return ((d = Tc(d, o.mode, v)), (d.return = o), d);
        case Lt:
          var g = d._init;
          return ((d = g(d._payload)), y(o, d, v));
      }
      if (Ua(d) || xa(d))
        return ((d = gl(d, o.mode, v, null)), (d.return = o), d);
      if (typeof d.then == "function") return y(o, Ln(d), v);
      if (d.$$typeof === At) return y(o, Yn(o, d), v);
      Bn(o, d);
    }
    return null;
  }
  function h(o, d, v, g) {
    var E = d !== null ? d.key : null;
    if (
      (typeof v == "string" && v !== "") ||
      typeof v == "number" ||
      typeof v == "bigint"
    )
      return E !== null ? null : s(o, d, "" + v, g);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Cn:
          return v.key === E ? f(o, d, v, g) : null;
        case Ra:
          return v.key === E ? r(o, d, v, g) : null;
        case Lt:
          return ((E = v._init), (v = E(v._payload)), h(o, d, v, g));
      }
      if (Ua(v) || xa(v)) return E !== null ? null : b(o, d, v, g, null);
      if (typeof v.then == "function") return h(o, d, Ln(v), g);
      if (v.$$typeof === At) return h(o, d, Yn(o, v), g);
      Bn(o, v);
    }
    return null;
  }
  function m(o, d, v, g, E) {
    if (
      (typeof g == "string" && g !== "") ||
      typeof g == "number" ||
      typeof g == "bigint"
    )
      return ((o = o.get(v) || null), s(d, o, "" + g, E));
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Cn:
          return (
            (o = o.get(g.key === null ? v : g.key) || null),
            f(d, o, g, E)
          );
        case Ra:
          return (
            (o = o.get(g.key === null ? v : g.key) || null),
            r(d, o, g, E)
          );
        case Lt:
          var C = g._init;
          return ((g = C(g._payload)), m(o, d, v, g, E));
      }
      if (Ua(g) || xa(g)) return ((o = o.get(v) || null), b(d, o, g, E, null));
      if (typeof g.then == "function") return m(o, d, v, Ln(g), E);
      if (g.$$typeof === At) return m(o, d, v, Yn(d, g), E);
      Bn(d, g);
    }
    return null;
  }
  function A(o, d, v, g) {
    for (
      var E = null, C = null, T = d, D = (d = 0), S = null;
      T !== null && D < v.length;
      D++
    ) {
      T.index > D ? ((S = T), (T = null)) : (S = T.sibling);
      var _ = h(o, T, v[D], g);
      if (_ === null) {
        T === null && (T = S);
        break;
      }
      (e && T && _.alternate === null && t(o, T),
        (d = u(_, d, D)),
        C === null ? (E = _) : (C.sibling = _),
        (C = _),
        (T = S));
    }
    if (D === v.length) return (l(o, T), G && rl(o, D), E);
    if (T === null) {
      for (; D < v.length; D++)
        ((T = y(o, v[D], g)),
          T !== null &&
            ((d = u(T, d, D)),
            C === null ? (E = T) : (C.sibling = T),
            (C = T)));
      return (G && rl(o, D), E);
    }
    for (T = a(T); D < v.length; D++)
      ((S = m(T, o, D, v[D], g)),
        S !== null &&
          (e && S.alternate !== null && T.delete(S.key === null ? D : S.key),
          (d = u(S, d, D)),
          C === null ? (E = S) : (C.sibling = S),
          (C = S)));
    return (
      e &&
        T.forEach(function (te) {
          return t(o, te);
        }),
      G && rl(o, D),
      E
    );
  }
  function N(o, d, v, g) {
    if (v == null) throw Error(p(151));
    for (
      var E = null, C = null, T = d, D = (d = 0), S = null, _ = v.next();
      T !== null && !_.done;
      D++, _ = v.next()
    ) {
      T.index > D ? ((S = T), (T = null)) : (S = T.sibling);
      var te = h(o, T, _.value, g);
      if (te === null) {
        T === null && (T = S);
        break;
      }
      (e && T && te.alternate === null && t(o, T),
        (d = u(te, d, D)),
        C === null ? (E = te) : (C.sibling = te),
        (C = te),
        (T = S));
    }
    if (_.done) return (l(o, T), G && rl(o, D), E);
    if (T === null) {
      for (; !_.done; D++, _ = v.next())
        ((_ = y(o, _.value, g)),
          _ !== null &&
            ((d = u(_, d, D)),
            C === null ? (E = _) : (C.sibling = _),
            (C = _)));
      return (G && rl(o, D), E);
    }
    for (T = a(T); !_.done; D++, _ = v.next())
      ((_ = m(T, o, D, _.value, g)),
        _ !== null &&
          (e && _.alternate !== null && T.delete(_.key === null ? D : _.key),
          (d = u(_, d, D)),
          C === null ? (E = _) : (C.sibling = _),
          (C = _)));
    return (
      e &&
        T.forEach(function (De) {
          return t(o, De);
        }),
      G && rl(o, D),
      E
    );
  }
  function R(o, d, v, g) {
    if (
      (typeof v == "object" &&
        v !== null &&
        v.type === Vl &&
        v.key === null &&
        (v = v.props.children),
      typeof v == "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case Cn:
          e: {
            for (var E = v.key; d !== null; ) {
              if (d.key === E) {
                if (((E = v.type), E === Vl)) {
                  if (d.tag === 7) {
                    (l(o, d.sibling),
                      (g = n(d, v.props.children)),
                      (g.return = o),
                      (o = g));
                    break e;
                  }
                } else if (
                  d.elementType === E ||
                  (typeof E == "object" &&
                    E !== null &&
                    E.$$typeof === Lt &&
                    _f(E) === d.type)
                ) {
                  (l(o, d.sibling),
                    (g = n(d, v.props)),
                    Ta(g, v),
                    (g.return = o),
                    (o = g));
                  break e;
                }
                l(o, d);
                break;
              } else t(o, d);
              d = d.sibling;
            }
            v.type === Vl
              ? ((g = gl(v.props.children, o.mode, g, v.key)),
                (g.return = o),
                (o = g))
              : ((g = nu(v.type, v.key, v.props, null, o.mode, g)),
                Ta(g, v),
                (g.return = o),
                (o = g));
          }
          return i(o);
        case Ra:
          e: {
            for (E = v.key; d !== null; ) {
              if (d.key === E)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === v.containerInfo &&
                  d.stateNode.implementation === v.implementation
                ) {
                  (l(o, d.sibling),
                    (g = n(d, v.children || [])),
                    (g.return = o),
                    (o = g));
                  break e;
                } else {
                  l(o, d);
                  break;
                }
              else t(o, d);
              d = d.sibling;
            }
            ((g = Tc(v, o.mode, g)), (g.return = o), (o = g));
          }
          return i(o);
        case Lt:
          return ((E = v._init), (v = E(v._payload)), R(o, d, v, g));
      }
      if (Ua(v)) return A(o, d, v, g);
      if (xa(v)) {
        if (((E = xa(v)), typeof E != "function")) throw Error(p(150));
        return ((v = E.call(v)), N(o, d, v, g));
      }
      if (typeof v.then == "function") return R(o, d, Ln(v), g);
      if (v.$$typeof === At) return R(o, d, Yn(o, v), g);
      Bn(o, v);
    }
    return (typeof v == "string" && v !== "") ||
      typeof v == "number" ||
      typeof v == "bigint"
      ? ((v = "" + v),
        d !== null && d.tag === 6
          ? (l(o, d.sibling), (g = n(d, v)), (g.return = o), (o = g))
          : (l(o, d), (g = jc(v, o.mode, g)), (g.return = o), (o = g)),
        i(o))
      : l(o, d);
  }
  return function (o, d, v, g) {
    try {
      cn = 0;
      var E = R(o, d, v, g);
      return ((la = null), E);
    } catch (T) {
      if (T === Qa) throw T;
      var C = $e(29, T, null, o.mode);
      return ((C.lanes = g), (C.return = o), C);
    } finally {
    }
  };
}
var Al = Vo(!0),
  Qo = Vo(!1),
  ra = ht(null),
  pu = ht(0);
function Sf(e, t) {
  ((e = Ct), ee(pu, e), ee(ra, t), (Ct = e | t.baseLanes));
}
function si() {
  (ee(pu, Ct), ee(ra, ra.current));
}
function us() {
  ((Ct = pu.current), pe(ra), pe(pu));
}
var Fe = ht(null),
  ot = null;
function Yt(e) {
  var t = e.alternate;
  (ee(me, me.current & 1),
    ee(Fe, e),
    ot === null &&
      (t === null || ra.current !== null || t.memoizedState !== null) &&
      (ot = e));
}
function Go(e) {
  if (e.tag === 22) {
    if ((ee(me, me.current), ee(Fe, e), ot === null)) {
      var t = e.alternate;
      t !== null && t.memoizedState !== null && (ot = e);
    }
  } else wt();
}
function wt() {
  (ee(me, me.current), ee(Fe, Fe.current));
}
function Nt(e) {
  (pe(Fe), ot === e && (ot = null), pe(me));
}
var me = ht(0);
function _u(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (
        l !== null &&
        ((l = l.dehydrated), l === null || l.data === "$?" || l.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var pm =
    typeof AbortController < "u"
      ? AbortController
      : function () {
          var e = [],
            t = (this.signal = {
              aborted: !1,
              addEventListener: function (l, a) {
                e.push(a);
              },
            });
          this.abort = function () {
            ((t.aborted = !0),
              e.forEach(function (l) {
                return l();
              }));
          };
        },
  _m = ve.unstable_scheduleCallback,
  Sm = ve.unstable_NormalPriority,
  he = {
    $$typeof: At,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function cs() {
  return { controller: new pm(), data: new Map(), refCount: 0 };
}
function An(e) {
  (e.refCount--,
    e.refCount === 0 &&
      _m(Sm, function () {
        e.controller.abort();
      }));
}
var Xa = null,
  fi = 0,
  oa = 0,
  aa = null;
function Am(e, t) {
  if (Xa === null) {
    var l = (Xa = []);
    ((fi = 0),
      (oa = Ms()),
      (aa = {
        status: "pending",
        value: void 0,
        then: function (a) {
          l.push(a);
        },
      }));
  }
  return (fi++, t.then(Af, Af), t);
}
function Af() {
  if (--fi === 0 && Xa !== null) {
    aa !== null && (aa.status = "fulfilled");
    var e = Xa;
    ((Xa = null), (oa = 0), (aa = null));
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
}
function xm(e, t) {
  var l = [],
    a = {
      status: "pending",
      value: null,
      reason: null,
      then: function (n) {
        l.push(n);
      },
    };
  return (
    e.then(
      function () {
        ((a.status = "fulfilled"), (a.value = t));
        for (var n = 0; n < l.length; n++) (0, l[n])(t);
      },
      function (n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      },
    ),
    a
  );
}
var xf = H.S;
H.S = function (e, t) {
  (typeof t == "object" &&
    t !== null &&
    typeof t.then == "function" &&
    Am(e, t),
    xf !== null && xf(e, t));
};
var bl = ht(null);
function is() {
  var e = bl.current;
  return e !== null ? e : F.pooledCache;
}
function eu(e, t) {
  t === null ? ee(bl, bl.current) : ee(bl, t.pool);
}
function Xo() {
  var e = is();
  return e === null ? null : { parent: he._currentValue, pool: e };
}
var tl = 0,
  L = null,
  K = null,
  oe = null,
  Su = !1,
  na = !1,
  xl = !1,
  Au = 0,
  sn = 0,
  ua = null,
  Em = 0;
function fe() {
  throw Error(p(321));
}
function ss(e, t) {
  if (t === null) return !1;
  for (var l = 0; l < t.length && l < e.length; l++)
    if (!we(e[l], t[l])) return !1;
  return !0;
}
function fs(e, t, l, a, n, u) {
  return (
    (tl = u),
    (L = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (H.H = e === null || e.memoizedState === null ? Ml : cl),
    (xl = !1),
    (u = l(a, n)),
    (xl = !1),
    na && (u = ko(t, l, a, n)),
    Zo(e),
    u
  );
}
function Zo(e) {
  H.H = dt;
  var t = K !== null && K.next !== null;
  if (((tl = 0), (oe = K = L = null), (Su = !1), (sn = 0), (ua = null), t))
    throw Error(p(300));
  e === null || ge || ((e = e.dependencies), e !== null && Nu(e) && (ge = !0));
}
function ko(e, t, l, a) {
  L = e;
  var n = 0;
  do {
    if ((na && (ua = null), (sn = 0), (na = !1), 25 <= n)) throw Error(p(301));
    if (((n += 1), (oe = K = null), e.updateQueue != null)) {
      var u = e.updateQueue;
      ((u.lastEffect = null),
        (u.events = null),
        (u.stores = null),
        u.memoCache != null && (u.memoCache.index = 0));
    }
    ((H.H = Dl), (u = t(l, a)));
  } while (na);
  return u;
}
function Nm() {
  var e = H.H,
    t = e.useState()[0];
  return (
    (t = typeof t.then == "function" ? xn(t) : t),
    (e = e.useState()[0]),
    (K !== null ? K.memoizedState : null) !== e && (L.flags |= 1024),
    t
  );
}
function rs() {
  var e = Au !== 0;
  return ((Au = 0), e);
}
function os(e, t, l) {
  ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
}
function ds(e) {
  if (Su) {
    for (e = e.memoizedState; e !== null; ) {
      var t = e.queue;
      (t !== null && (t.pending = null), (e = e.next));
    }
    Su = !1;
  }
  ((tl = 0), (oe = K = L = null), (na = !1), (sn = Au = 0), (ua = null));
}
function Ce() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (oe === null ? (L.memoizedState = oe = e) : (oe = oe.next = e), oe);
}
function de() {
  if (K === null) {
    var e = L.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = K.next;
  var t = oe === null ? L.memoizedState : oe.next;
  if (t !== null) ((oe = t), (K = e));
  else {
    if (e === null) throw L.alternate === null ? Error(p(467)) : Error(p(310));
    ((K = e),
      (e = {
        memoizedState: K.memoizedState,
        baseState: K.baseState,
        baseQueue: K.baseQueue,
        queue: K.queue,
        next: null,
      }),
      oe === null ? (L.memoizedState = oe = e) : (oe = oe.next = e));
  }
  return oe;
}
var Ju;
Ju = function () {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
};
function xn(e) {
  var t = sn;
  return (
    (sn += 1),
    ua === null && (ua = []),
    (e = wo(ua, e, t)),
    (t = L),
    (oe === null ? t.memoizedState : oe.next) === null &&
      ((t = t.alternate),
      (H.H = t === null || t.memoizedState === null ? Ml : cl)),
    e
  );
}
function $u(e) {
  if (e !== null && typeof e == "object") {
    if (typeof e.then == "function") return xn(e);
    if (e.$$typeof === At) return Ne(e);
  }
  throw Error(p(438, String(e)));
}
function hs(e) {
  var t = null,
    l = L.updateQueue;
  if ((l !== null && (t = l.memoCache), t == null)) {
    var a = L.alternate;
    a !== null &&
      ((a = a.updateQueue),
      a !== null &&
        ((a = a.memoCache),
        a != null &&
          (t = {
            data: a.data.map(function (n) {
              return n.slice();
            }),
            index: 0,
          })));
  }
  if (
    (t == null && (t = { data: [], index: 0 }),
    l === null && ((l = Ju()), (L.updateQueue = l)),
    (l.memoCache = t),
    (l = t.data[t.index]),
    l === void 0)
  )
    for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = i0;
  return (t.index++, l);
}
function Mt(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function tu(e) {
  var t = de();
  return ms(t, K, e);
}
function ms(e, t, l) {
  var a = e.queue;
  if (a === null) throw Error(p(311));
  a.lastRenderedReducer = l;
  var n = e.baseQueue,
    u = a.pending;
  if (u !== null) {
    if (n !== null) {
      var i = n.next;
      ((n.next = u.next), (u.next = i));
    }
    ((t.baseQueue = n = u), (a.pending = null));
  }
  if (((u = e.baseState), n === null)) e.memoizedState = u;
  else {
    t = n.next;
    var s = (i = null),
      f = null,
      r = t,
      b = !1;
    do {
      var y = r.lane & -536870913;
      if (y !== r.lane ? (V & y) === y : (tl & y) === y) {
        var h = r.revertLane;
        if (h === 0)
          (f !== null &&
            (f = f.next =
              {
                lane: 0,
                revertLane: 0,
                action: r.action,
                hasEagerState: r.hasEagerState,
                eagerState: r.eagerState,
                next: null,
              }),
            y === oa && (b = !0));
        else if ((tl & h) === h) {
          ((r = r.next), h === oa && (b = !0));
          continue;
        } else
          ((y = {
            lane: 0,
            revertLane: r.revertLane,
            action: r.action,
            hasEagerState: r.hasEagerState,
            eagerState: r.eagerState,
            next: null,
          }),
            f === null ? ((s = f = y), (i = u)) : (f = f.next = y),
            (L.lanes |= h),
            (al |= h));
        ((y = r.action),
          xl && l(u, y),
          (u = r.hasEagerState ? r.eagerState : l(u, y)));
      } else
        ((h = {
          lane: y,
          revertLane: r.revertLane,
          action: r.action,
          hasEagerState: r.hasEagerState,
          eagerState: r.eagerState,
          next: null,
        }),
          f === null ? ((s = f = h), (i = u)) : (f = f.next = h),
          (L.lanes |= y),
          (al |= y));
      r = r.next;
    } while (r !== null && r !== t);
    if (
      (f === null ? (i = u) : (f.next = s),
      !we(u, e.memoizedState) && ((ge = !0), b && ((l = aa), l !== null)))
    )
      throw l;
    ((e.memoizedState = u),
      (e.baseState = i),
      (e.baseQueue = f),
      (a.lastRenderedState = u));
  }
  return (n === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
}
function vc(e) {
  var t = de(),
    l = t.queue;
  if (l === null) throw Error(p(311));
  l.lastRenderedReducer = e;
  var a = l.dispatch,
    n = l.pending,
    u = t.memoizedState;
  if (n !== null) {
    l.pending = null;
    var i = (n = n.next);
    do ((u = e(u, i.action)), (i = i.next));
    while (i !== n);
    (we(u, t.memoizedState) || (ge = !0),
      (t.memoizedState = u),
      t.baseQueue === null && (t.baseState = u),
      (l.lastRenderedState = u));
  }
  return [u, a];
}
function Ko(e, t, l) {
  var a = L,
    n = de(),
    u = G;
  if (u) {
    if (l === void 0) throw Error(p(407));
    l = l();
  } else l = t();
  var i = !we((K || n).memoizedState, l);
  if (
    (i && ((n.memoizedState = l), (ge = !0)),
    (n = n.queue),
    vs(Wo.bind(null, a, n, e), [e]),
    n.getSnapshot !== t || i || (oe !== null && oe.memoizedState.tag & 1))
  ) {
    if (
      ((a.flags |= 2048),
      da(9, $o.bind(null, a, n, l, t), { destroy: void 0 }, null),
      F === null)
    )
      throw Error(p(349));
    u || tl & 60 || Jo(a, t, l);
  }
  return l;
}
function Jo(e, t, l) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: l }),
    (t = L.updateQueue),
    t === null
      ? ((t = Ju()), (L.updateQueue = t), (t.stores = [e]))
      : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
}
function $o(e, t, l, a) {
  ((t.value = l), (t.getSnapshot = a), Fo(t) && Io(e));
}
function Wo(e, t, l) {
  return l(function () {
    Fo(t) && Io(e);
  });
}
function Fo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var l = t();
    return !we(e, l);
  } catch {
    return !0;
  }
}
function Io(e) {
  var t = el(e, 2);
  t !== null && Oe(t, e, 2);
}
function ri(e) {
  var t = Ce();
  if (typeof e == "function") {
    var l = e;
    if (((e = l()), xl)) {
      Gt(!0);
      try {
        l();
      } finally {
        Gt(!1);
      }
    }
  }
  return (
    (t.memoizedState = t.baseState = e),
    (t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Mt,
      lastRenderedState: e,
    }),
    t
  );
}
function Po(e, t, l, a) {
  return ((e.baseState = l), ms(e, K, typeof a == "function" ? a : Mt));
}
function jm(e, t, l, a, n) {
  if (Fu(e)) throw Error(p(485));
  if (((e = t.action), e !== null)) {
    var u = {
      payload: n,
      action: e,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (i) {
        u.listeners.push(i);
      },
    };
    (H.T !== null ? l(!0) : (u.isTransition = !1),
      a(u),
      (l = t.pending),
      l === null
        ? ((u.next = t.pending = u), ed(t, u))
        : ((u.next = l.next), (t.pending = l.next = u)));
  }
}
function ed(e, t) {
  var l = t.action,
    a = t.payload,
    n = e.state;
  if (t.isTransition) {
    var u = H.T,
      i = {};
    H.T = i;
    try {
      var s = l(n, a),
        f = H.S;
      (f !== null && f(i, s), Ef(e, t, s));
    } catch (r) {
      oi(e, t, r);
    } finally {
      H.T = u;
    }
  } else
    try {
      ((u = l(n, a)), Ef(e, t, u));
    } catch (r) {
      oi(e, t, r);
    }
}
function Ef(e, t, l) {
  l !== null && typeof l == "object" && typeof l.then == "function"
    ? l.then(
        function (a) {
          Nf(e, t, a);
        },
        function (a) {
          return oi(e, t, a);
        },
      )
    : Nf(e, t, l);
}
function Nf(e, t, l) {
  ((t.status = "fulfilled"),
    (t.value = l),
    td(t),
    (e.state = l),
    (t = e.pending),
    t !== null &&
      ((l = t.next),
      l === t ? (e.pending = null) : ((l = l.next), (t.next = l), ed(e, l))));
}
function oi(e, t, l) {
  var a = e.pending;
  if (((e.pending = null), a !== null)) {
    a = a.next;
    do ((t.status = "rejected"), (t.reason = l), td(t), (t = t.next));
    while (t !== a);
  }
  e.action = null;
}
function td(e) {
  e = e.listeners;
  for (var t = 0; t < e.length; t++) (0, e[t])();
}
function ld(e, t) {
  return t;
}
function ad(e, t) {
  if (G) {
    var l = F.formState;
    if (l !== null) {
      e: {
        var a = L;
        if (G) {
          if (Se) {
            t: {
              for (var n = Se, u = it; n.nodeType !== 8; ) {
                if (!u) {
                  n = null;
                  break t;
                }
                if (((n = at(n.nextSibling)), n === null)) {
                  n = null;
                  break t;
                }
              }
              ((u = n.data), (n = u === "F!" || u === "F" ? n : null));
            }
            if (n) {
              ((Se = at(n.nextSibling)), (a = n.data === "F!"));
              break e;
            }
          }
          Sl(a);
        }
        a = !1;
      }
      a && (t = l[0]);
    }
  }
  return (
    (l = Ce()),
    (l.memoizedState = l.baseState = t),
    (a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ld,
      lastRenderedState: t,
    }),
    (l.queue = a),
    (l = _d.bind(null, L, a)),
    (a.dispatch = l),
    (a = ri(!1)),
    (u = ps.bind(null, L, !1, a.queue)),
    (a = Ce()),
    (n = { state: t, dispatch: null, action: e, pending: null }),
    (a.queue = n),
    (l = jm.bind(null, L, n, u, l)),
    (n.dispatch = l),
    (a.memoizedState = e),
    [t, l, !1]
  );
}
function nd(e) {
  var t = de();
  return ud(t, K, e);
}
function ud(e, t, l) {
  ((t = ms(e, t, ld)[0]),
    (e = tu(Mt)[0]),
    (t =
      typeof t == "object" && t !== null && typeof t.then == "function"
        ? xn(t)
        : t));
  var a = de(),
    n = a.queue,
    u = n.dispatch;
  return (
    l !== a.memoizedState &&
      ((L.flags |= 2048),
      da(9, Tm.bind(null, n, l), { destroy: void 0 }, null)),
    [t, u, e]
  );
}
function Tm(e, t) {
  e.action = t;
}
function cd(e) {
  var t = de(),
    l = K;
  if (l !== null) return ud(t, l, e);
  (de(), (t = t.memoizedState), (l = de()));
  var a = l.queue.dispatch;
  return ((l.memoizedState = e), [t, a, !1]);
}
function da(e, t, l, a) {
  return (
    (e = { tag: e, create: t, inst: l, deps: a, next: null }),
    (t = L.updateQueue),
    t === null && ((t = Ju()), (L.updateQueue = t)),
    (l = t.lastEffect),
    l === null
      ? (t.lastEffect = e.next = e)
      : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
    e
  );
}
function id() {
  return de().memoizedState;
}
function lu(e, t, l, a) {
  var n = Ce();
  ((L.flags |= e),
    (n.memoizedState = da(
      1 | t,
      l,
      { destroy: void 0 },
      a === void 0 ? null : a,
    )));
}
function Wu(e, t, l, a) {
  var n = de();
  a = a === void 0 ? null : a;
  var u = n.memoizedState.inst;
  K !== null && a !== null && ss(a, K.memoizedState.deps)
    ? (n.memoizedState = da(t, l, u, a))
    : ((L.flags |= e), (n.memoizedState = da(1 | t, l, u, a)));
}
function jf(e, t) {
  lu(8390656, 8, e, t);
}
function vs(e, t) {
  Wu(2048, 8, e, t);
}
function sd(e, t) {
  return Wu(4, 2, e, t);
}
function fd(e, t) {
  return Wu(4, 4, e, t);
}
function rd(e, t) {
  if (typeof t == "function") {
    e = e();
    var l = t(e);
    return function () {
      typeof l == "function" ? l() : t(null);
    };
  }
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function od(e, t, l) {
  ((l = l != null ? l.concat([e]) : null), Wu(4, 4, rd.bind(null, t, e), l));
}
function ys() {}
function dd(e, t) {
  var l = de();
  t = t === void 0 ? null : t;
  var a = l.memoizedState;
  return t !== null && ss(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
}
function hd(e, t) {
  var l = de();
  t = t === void 0 ? null : t;
  var a = l.memoizedState;
  if (t !== null && ss(t, a[1])) return a[0];
  if (((a = e()), xl)) {
    Gt(!0);
    try {
      e();
    } finally {
      Gt(!1);
    }
  }
  return ((l.memoizedState = [a, t]), a);
}
function bs(e, t, l) {
  return l === void 0 || tl & 1073741824
    ? (e.memoizedState = t)
    : ((e.memoizedState = l), (e = th()), (L.lanes |= e), (al |= e), l);
}
function md(e, t, l, a) {
  return we(l, t)
    ? l
    : ra.current !== null
      ? ((e = bs(e, l, a)), we(e, t) || (ge = !0), e)
      : tl & 42
        ? ((e = th()), (L.lanes |= e), (al |= e), t)
        : ((ge = !0), (e.memoizedState = l));
}
function vd(e, t, l, a, n) {
  var u = I.p;
  I.p = u !== 0 && 8 > u ? u : 8;
  var i = H.T,
    s = {};
  ((H.T = s), ps(e, !1, t, l));
  try {
    var f = n(),
      r = H.S;
    if (
      (r !== null && r(s, f),
      f !== null && typeof f == "object" && typeof f.then == "function")
    ) {
      var b = xm(f, a);
      Za(e, t, b, Ye(e));
    } else Za(e, t, a, Ye(e));
  } catch (y) {
    Za(e, t, { then: function () {}, status: "rejected", reason: y }, Ye());
  } finally {
    ((I.p = u), (H.T = i));
  }
}
function Om() {}
function di(e, t, l, a) {
  if (e.tag !== 5) throw Error(p(476));
  var n = yd(e).queue;
  vd(
    e,
    n,
    t,
    vl,
    l === null
      ? Om
      : function () {
          return (bd(e), l(a));
        },
  );
}
function yd(e) {
  var t = e.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: vl,
    baseState: vl,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Mt,
      lastRenderedState: vl,
    },
    next: null,
  };
  var l = {};
  return (
    (t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Mt,
        lastRenderedState: l,
      },
      next: null,
    }),
    (e.memoizedState = t),
    (e = e.alternate),
    e !== null && (e.memoizedState = t),
    t
  );
}
function bd(e) {
  var t = yd(e).next.queue;
  Za(e, t, {}, Ye());
}
function gs() {
  return Ne(dn);
}
function gd() {
  return de().memoizedState;
}
function pd() {
  return de().memoizedState;
}
function Mm(e) {
  for (var t = e.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var l = Ye();
        e = kt(l);
        var a = Kt(t, e, l);
        (a !== null && (Oe(a, t, l), Ka(a, t, l)),
          (t = { cache: cs() }),
          (e.payload = t));
        return;
    }
    t = t.return;
  }
}
function Dm(e, t, l) {
  var a = Ye();
  ((l = {
    lane: a,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  }),
    Fu(e)
      ? Sd(t, l)
      : ((l = ls(e, t, l, a)), l !== null && (Oe(l, e, a), Ad(l, t, a))));
}
function _d(e, t, l) {
  var a = Ye();
  Za(e, t, l, a);
}
function Za(e, t, l, a) {
  var n = {
    lane: a,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  };
  if (Fu(e)) Sd(t, n);
  else {
    var u = e.alternate;
    if (
      e.lanes === 0 &&
      (u === null || u.lanes === 0) &&
      ((u = t.lastRenderedReducer), u !== null)
    )
      try {
        var i = t.lastRenderedState,
          s = u(i, l);
        if (((n.hasEagerState = !0), (n.eagerState = s), we(s, i)))
          return (Ku(e, t, n, 0), F === null && ku(), !1);
      } catch {
      } finally {
      }
    if (((l = ls(e, t, n, a)), l !== null))
      return (Oe(l, e, a), Ad(l, t, a), !0);
  }
  return !1;
}
function ps(e, t, l, a) {
  if (
    ((a = {
      lane: 2,
      revertLane: Ms(),
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Fu(e))
  ) {
    if (t) throw Error(p(479));
  } else ((t = ls(e, l, a, 2)), t !== null && Oe(t, e, 2));
}
function Fu(e) {
  var t = e.alternate;
  return e === L || (t !== null && t === L);
}
function Sd(e, t) {
  na = Su = !0;
  var l = e.pending;
  (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
    (e.pending = t));
}
function Ad(e, t, l) {
  if (l & 4194176) {
    var a = t.lanes;
    ((a &= e.pendingLanes), (l |= a), (t.lanes = l), fo(e, l));
  }
}
var dt = {
  readContext: Ne,
  use: $u,
  useCallback: fe,
  useContext: fe,
  useEffect: fe,
  useImperativeHandle: fe,
  useLayoutEffect: fe,
  useInsertionEffect: fe,
  useMemo: fe,
  useReducer: fe,
  useRef: fe,
  useState: fe,
  useDebugValue: fe,
  useDeferredValue: fe,
  useTransition: fe,
  useSyncExternalStore: fe,
  useId: fe,
};
dt.useCacheRefresh = fe;
dt.useMemoCache = fe;
dt.useHostTransitionStatus = fe;
dt.useFormState = fe;
dt.useActionState = fe;
dt.useOptimistic = fe;
var Ml = {
  readContext: Ne,
  use: $u,
  useCallback: function (e, t) {
    return ((Ce().memoizedState = [e, t === void 0 ? null : t]), e);
  },
  useContext: Ne,
  useEffect: jf,
  useImperativeHandle: function (e, t, l) {
    ((l = l != null ? l.concat([e]) : null),
      lu(4194308, 4, rd.bind(null, t, e), l));
  },
  useLayoutEffect: function (e, t) {
    return lu(4194308, 4, e, t);
  },
  useInsertionEffect: function (e, t) {
    lu(4, 2, e, t);
  },
  useMemo: function (e, t) {
    var l = Ce();
    t = t === void 0 ? null : t;
    var a = e();
    if (xl) {
      Gt(!0);
      try {
        e();
      } finally {
        Gt(!1);
      }
    }
    return ((l.memoizedState = [a, t]), a);
  },
  useReducer: function (e, t, l) {
    var a = Ce();
    if (l !== void 0) {
      var n = l(t);
      if (xl) {
        Gt(!0);
        try {
          l(t);
        } finally {
          Gt(!1);
        }
      }
    } else n = t;
    return (
      (a.memoizedState = a.baseState = n),
      (e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n,
      }),
      (a.queue = e),
      (e = e.dispatch = Dm.bind(null, L, e)),
      [a.memoizedState, e]
    );
  },
  useRef: function (e) {
    var t = Ce();
    return ((e = { current: e }), (t.memoizedState = e));
  },
  useState: function (e) {
    e = ri(e);
    var t = e.queue,
      l = _d.bind(null, L, t);
    return ((t.dispatch = l), [e.memoizedState, l]);
  },
  useDebugValue: ys,
  useDeferredValue: function (e, t) {
    var l = Ce();
    return bs(l, e, t);
  },
  useTransition: function () {
    var e = ri(!1);
    return (
      (e = vd.bind(null, L, e.queue, !0, !1)),
      (Ce().memoizedState = e),
      [!1, e]
    );
  },
  useSyncExternalStore: function (e, t, l) {
    var a = L,
      n = Ce();
    if (G) {
      if (l === void 0) throw Error(p(407));
      l = l();
    } else {
      if (((l = t()), F === null)) throw Error(p(349));
      V & 60 || Jo(a, t, l);
    }
    n.memoizedState = l;
    var u = { value: l, getSnapshot: t };
    return (
      (n.queue = u),
      jf(Wo.bind(null, a, u, e), [e]),
      (a.flags |= 2048),
      da(9, $o.bind(null, a, u, l, t), { destroy: void 0 }, null),
      l
    );
  },
  useId: function () {
    var e = Ce(),
      t = F.identifierPrefix;
    if (G) {
      var l = Et,
        a = xt;
      ((l = (a & ~(1 << (32 - Be(a) - 1))).toString(32) + l),
        (t = ":" + t + "R" + l),
        (l = Au++),
        0 < l && (t += "H" + l.toString(32)),
        (t += ":"));
    } else ((l = Em++), (t = ":" + t + "r" + l.toString(32) + ":"));
    return (e.memoizedState = t);
  },
  useCacheRefresh: function () {
    return (Ce().memoizedState = Mm.bind(null, L));
  },
};
Ml.useMemoCache = hs;
Ml.useHostTransitionStatus = gs;
Ml.useFormState = ad;
Ml.useActionState = ad;
Ml.useOptimistic = function (e) {
  var t = Ce();
  t.memoizedState = t.baseState = e;
  var l = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: null,
    lastRenderedState: null,
  };
  return (
    (t.queue = l),
    (t = ps.bind(null, L, !0, l)),
    (l.dispatch = t),
    [e, t]
  );
};
var cl = {
  readContext: Ne,
  use: $u,
  useCallback: dd,
  useContext: Ne,
  useEffect: vs,
  useImperativeHandle: od,
  useInsertionEffect: sd,
  useLayoutEffect: fd,
  useMemo: hd,
  useReducer: tu,
  useRef: id,
  useState: function () {
    return tu(Mt);
  },
  useDebugValue: ys,
  useDeferredValue: function (e, t) {
    var l = de();
    return md(l, K.memoizedState, e, t);
  },
  useTransition: function () {
    var e = tu(Mt)[0],
      t = de().memoizedState;
    return [typeof e == "boolean" ? e : xn(e), t];
  },
  useSyncExternalStore: Ko,
  useId: gd,
};
cl.useCacheRefresh = pd;
cl.useMemoCache = hs;
cl.useHostTransitionStatus = gs;
cl.useFormState = nd;
cl.useActionState = nd;
cl.useOptimistic = function (e, t) {
  var l = de();
  return Po(l, K, e, t);
};
var Dl = {
  readContext: Ne,
  use: $u,
  useCallback: dd,
  useContext: Ne,
  useEffect: vs,
  useImperativeHandle: od,
  useInsertionEffect: sd,
  useLayoutEffect: fd,
  useMemo: hd,
  useReducer: vc,
  useRef: id,
  useState: function () {
    return vc(Mt);
  },
  useDebugValue: ys,
  useDeferredValue: function (e, t) {
    var l = de();
    return K === null ? bs(l, e, t) : md(l, K.memoizedState, e, t);
  },
  useTransition: function () {
    var e = vc(Mt)[0],
      t = de().memoizedState;
    return [typeof e == "boolean" ? e : xn(e), t];
  },
  useSyncExternalStore: Ko,
  useId: gd,
};
Dl.useCacheRefresh = pd;
Dl.useMemoCache = hs;
Dl.useHostTransitionStatus = gs;
Dl.useFormState = cd;
Dl.useActionState = cd;
Dl.useOptimistic = function (e, t) {
  var l = de();
  return K !== null
    ? Po(l, K, e, t)
    : ((l.baseState = e), [e, l.queue.dispatch]);
};
function yc(e, t, l, a) {
  ((t = e.memoizedState),
    (l = l(a, t)),
    (l = l == null ? t : P({}, t, l)),
    (e.memoizedState = l),
    e.lanes === 0 && (e.updateQueue.baseState = l));
}
var hi = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? ba(e) === e : !1;
  },
  enqueueSetState: function (e, t, l) {
    e = e._reactInternals;
    var a = Ye(),
      n = kt(a);
    ((n.payload = t),
      l != null && (n.callback = l),
      (t = Kt(e, n, a)),
      t !== null && (Oe(t, e, a), Ka(t, e, a)));
  },
  enqueueReplaceState: function (e, t, l) {
    e = e._reactInternals;
    var a = Ye(),
      n = kt(a);
    ((n.tag = 1),
      (n.payload = t),
      l != null && (n.callback = l),
      (t = Kt(e, n, a)),
      t !== null && (Oe(t, e, a), Ka(t, e, a)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var l = Ye(),
      a = kt(l);
    ((a.tag = 2),
      t != null && (a.callback = t),
      (t = Kt(e, a, l)),
      t !== null && (Oe(t, e, l), Ka(t, e, l)));
  },
};
function Tf(e, t, l, a, n, u, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(a, u, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !nn(l, a) || !nn(n, u)
        : !0
  );
}
function Of(e, t, l, a) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(l, a),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(l, a),
    t.state !== e && hi.enqueueReplaceState(t, t.state, null));
}
function El(e, t) {
  var l = t;
  if ("ref" in t) {
    l = {};
    for (var a in t) a !== "ref" && (l[a] = t[a]);
  }
  if ((e = e.defaultProps)) {
    l === t && (l = P({}, l));
    for (var n in e) l[n] === void 0 && (l[n] = e[n]);
  }
  return l;
}
var xu =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        if (
          typeof window == "object" &&
          typeof window.ErrorEvent == "function"
        ) {
          var t = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof e == "object" && e !== null && typeof e.message == "string"
                ? String(e.message)
                : String(e),
            error: e,
          });
          if (!window.dispatchEvent(t)) return;
        } else if (
          typeof process == "object" &&
          typeof process.emit == "function"
        ) {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      };
function xd(e) {
  xu(e);
}
function Ed(e) {
  console.error(e);
}
function Nd(e) {
  xu(e);
}
function Eu(e, t) {
  try {
    var l = e.onUncaughtError;
    l(t.value, { componentStack: t.stack });
  } catch (a) {
    setTimeout(function () {
      throw a;
    });
  }
}
function Mf(e, t, l) {
  try {
    var a = e.onCaughtError;
    a(l.value, {
      componentStack: l.stack,
      errorBoundary: t.tag === 1 ? t.stateNode : null,
    });
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
function mi(e, t, l) {
  return (
    (l = kt(l)),
    (l.tag = 3),
    (l.payload = { element: null }),
    (l.callback = function () {
      Eu(e, t);
    }),
    l
  );
}
function jd(e) {
  return ((e = kt(e)), (e.tag = 3), e);
}
function Td(e, t, l, a) {
  var n = l.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var u = a.value;
    ((e.payload = function () {
      return n(u);
    }),
      (e.callback = function () {
        Mf(t, l, a);
      }));
  }
  var i = l.stateNode;
  i !== null &&
    typeof i.componentDidCatch == "function" &&
    (e.callback = function () {
      (Mf(t, l, a),
        typeof n != "function" &&
          ($t === null ? ($t = new Set([this])) : $t.add(this)));
      var s = a.stack;
      this.componentDidCatch(a.value, { componentStack: s !== null ? s : "" });
    });
}
function Cm(e, t, l, a, n) {
  if (
    ((l.flags |= 32768),
    a !== null && typeof a == "object" && typeof a.then == "function")
  ) {
    if (
      ((t = l.alternate),
      t !== null && En(t, l, n, !0),
      (l = Fe.current),
      l !== null)
    ) {
      switch (l.tag) {
        case 13:
          return (
            ot === null ? Mi() : l.alternate === null && ie === 0 && (ie = 3),
            (l.flags &= -257),
            (l.flags |= 65536),
            (l.lanes = n),
            a === ii
              ? (l.flags |= 16384)
              : ((t = l.updateQueue),
                t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                Mc(e, a, n)),
            !1
          );
        case 22:
          return (
            (l.flags |= 65536),
            a === ii
              ? (l.flags |= 16384)
              : ((t = l.updateQueue),
                t === null
                  ? ((t = {
                      transitions: null,
                      markerInstances: null,
                      retryQueue: new Set([a]),
                    }),
                    (l.updateQueue = t))
                  : ((l = t.retryQueue),
                    l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                Mc(e, a, n)),
            !1
          );
      }
      throw Error(p(435, l.tag));
    }
    return (Mc(e, a, n), Mi(), !1);
  }
  if (G)
    return (
      (t = Fe.current),
      t !== null
        ? (!(t.flags & 65536) && (t.flags |= 256),
          (t.flags |= 65536),
          (t.lanes = n),
          a !== ci && ((e = Error(p(422), { cause: a })), un(Je(e, l))))
        : (a !== ci && ((t = Error(p(423), { cause: a })), un(Je(t, l))),
          (e = e.current.alternate),
          (e.flags |= 65536),
          (n &= -n),
          (e.lanes |= n),
          (a = Je(a, l)),
          (n = mi(e.stateNode, a, n)),
          Ac(e, n),
          ie !== 4 && (ie = 2)),
      !1
    );
  var u = Error(p(520), { cause: a });
  if (
    ((u = Je(u, l)),
    Fa === null ? (Fa = [u]) : Fa.push(u),
    ie !== 4 && (ie = 2),
    t === null)
  )
    return !0;
  ((a = Je(a, l)), (l = t));
  do {
    switch (l.tag) {
      case 3:
        return (
          (l.flags |= 65536),
          (e = n & -n),
          (l.lanes |= e),
          (e = mi(l.stateNode, a, e)),
          Ac(l, e),
          !1
        );
      case 1:
        if (
          ((t = l.type),
          (u = l.stateNode),
          (l.flags & 128) === 0 &&
            (typeof t.getDerivedStateFromError == "function" ||
              (u !== null &&
                typeof u.componentDidCatch == "function" &&
                ($t === null || !$t.has(u)))))
        )
          return (
            (l.flags |= 65536),
            (n &= -n),
            (l.lanes |= n),
            (n = jd(n)),
            Td(n, e, l, a),
            Ac(l, n),
            !1
          );
    }
    l = l.return;
  } while (l !== null);
  return !1;
}
var Od = Error(p(461)),
  ge = !1;
function _e(e, t, l, a) {
  t.child = e === null ? Qo(t, null, l, a) : Al(t, e.child, l, a);
}
function Df(e, t, l, a, n) {
  l = l.render;
  var u = t.ref;
  if ("ref" in a) {
    var i = {};
    for (var s in a) s !== "ref" && (i[s] = a[s]);
  } else i = a;
  return (
    Nl(t),
    (a = fs(e, t, l, i, u, n)),
    (s = rs()),
    e !== null && !ge
      ? (os(e, t, n), Dt(e, t, n))
      : (G && s && as(t), (t.flags |= 1), _e(e, t, a, n), t.child)
  );
}
function Cf(e, t, l, a, n) {
  if (e === null) {
    var u = l.type;
    return typeof u == "function" &&
      !Es(u) &&
      u.defaultProps === void 0 &&
      l.compare === null
      ? ((t.tag = 15), (t.type = u), Md(e, t, u, a, n))
      : ((e = nu(l.type, null, a, t, t.mode, n)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((u = e.child), !_s(e, n))) {
    var i = u.memoizedProps;
    if (
      ((l = l.compare), (l = l !== null ? l : nn), l(i, a) && e.ref === t.ref)
    )
      return Dt(e, t, n);
  }
  return (
    (t.flags |= 1),
    (e = Jt(u, a)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Md(e, t, l, a, n) {
  if (e !== null) {
    var u = e.memoizedProps;
    if (nn(u, a) && e.ref === t.ref)
      if (((ge = !1), (t.pendingProps = a = u), _s(e, n)))
        e.flags & 131072 && (ge = !0);
      else return ((t.lanes = e.lanes), Dt(e, t, n));
  }
  return vi(e, t, l, a, n);
}
function Dd(e, t, l) {
  var a = t.pendingProps,
    n = a.children,
    u = (t.stateNode._pendingVisibility & 2) !== 0,
    i = e !== null ? e.memoizedState : null;
  if ((ka(e, t), a.mode === "hidden" || u)) {
    if (t.flags & 128) {
      if (((a = i !== null ? i.baseLanes | l : l), e !== null)) {
        for (n = t.child = e.child, u = 0; n !== null; )
          ((u = u | n.lanes | n.childLanes), (n = n.sibling));
        t.childLanes = u & ~a;
      } else ((t.childLanes = 0), (t.child = null));
      return Rf(e, t, a, l);
    }
    if (l & 536870912)
      ((t.memoizedState = { baseLanes: 0, cachePool: null }),
        e !== null && eu(t, i !== null ? i.cachePool : null),
        i !== null ? Sf(t, i) : si(),
        Go(t));
    else
      return (
        (t.lanes = t.childLanes = 536870912),
        Rf(e, t, i !== null ? i.baseLanes | l : l, l)
      );
  } else
    i !== null
      ? (eu(t, i.cachePool), Sf(t, i), wt(), (t.memoizedState = null))
      : (e !== null && eu(t, null), si(), wt());
  return (_e(e, t, n, l), t.child);
}
function Rf(e, t, l, a) {
  var n = is();
  return (
    (n = n === null ? null : { parent: he._currentValue, pool: n }),
    (t.memoizedState = { baseLanes: l, cachePool: n }),
    e !== null && eu(t, null),
    si(),
    Go(t),
    e !== null && En(e, t, a, !0),
    null
  );
}
function ka(e, t) {
  var l = t.ref;
  if (l === null) e !== null && e.ref !== null && (t.flags |= 2097664);
  else {
    if (typeof l != "function" && typeof l != "object") throw Error(p(284));
    (e === null || e.ref !== l) && (t.flags |= 2097664);
  }
}
function vi(e, t, l, a, n) {
  return (
    Nl(t),
    (l = fs(e, t, l, a, void 0, n)),
    (a = rs()),
    e !== null && !ge
      ? (os(e, t, n), Dt(e, t, n))
      : (G && a && as(t), (t.flags |= 1), _e(e, t, l, n), t.child)
  );
}
function zf(e, t, l, a, n, u) {
  return (
    Nl(t),
    (t.updateQueue = null),
    (l = ko(t, a, l, n)),
    Zo(e),
    (a = rs()),
    e !== null && !ge
      ? (os(e, t, u), Dt(e, t, u))
      : (G && a && as(t), (t.flags |= 1), _e(e, t, l, u), t.child)
  );
}
function Uf(e, t, l, a, n) {
  if ((Nl(t), t.stateNode === null)) {
    var u = Jl,
      i = l.contextType;
    (typeof i == "object" && i !== null && (u = Ne(i)),
      (u = new l(a, u)),
      (t.memoizedState =
        u.state !== null && u.state !== void 0 ? u.state : null),
      (u.updater = hi),
      (t.stateNode = u),
      (u._reactInternals = t),
      (u = t.stateNode),
      (u.props = a),
      (u.state = t.memoizedState),
      (u.refs = {}),
      Ss(t),
      (i = l.contextType),
      (u.context = typeof i == "object" && i !== null ? Ne(i) : Jl),
      (u.state = t.memoizedState),
      (i = l.getDerivedStateFromProps),
      typeof i == "function" && (yc(t, l, i, a), (u.state = t.memoizedState)),
      typeof l.getDerivedStateFromProps == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function" ||
        (typeof u.UNSAFE_componentWillMount != "function" &&
          typeof u.componentWillMount != "function") ||
        ((i = u.state),
        typeof u.componentWillMount == "function" && u.componentWillMount(),
        typeof u.UNSAFE_componentWillMount == "function" &&
          u.UNSAFE_componentWillMount(),
        i !== u.state && hi.enqueueReplaceState(u, u.state, null),
        $a(t, a, u, n),
        Ja(),
        (u.state = t.memoizedState)),
      typeof u.componentDidMount == "function" && (t.flags |= 4194308),
      (a = !0));
  } else if (e === null) {
    u = t.stateNode;
    var s = t.memoizedProps,
      f = El(l, s);
    u.props = f;
    var r = u.context,
      b = l.contextType;
    ((i = Jl), typeof b == "object" && b !== null && (i = Ne(b)));
    var y = l.getDerivedStateFromProps;
    ((b =
      typeof y == "function" || typeof u.getSnapshotBeforeUpdate == "function"),
      (s = t.pendingProps !== s),
      b ||
        (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
          typeof u.componentWillReceiveProps != "function") ||
        ((s || r !== i) && Of(t, u, a, i)),
      (Bt = !1));
    var h = t.memoizedState;
    ((u.state = h),
      $a(t, a, u, n),
      Ja(),
      (r = t.memoizedState),
      s || h !== r || Bt
        ? (typeof y == "function" && (yc(t, l, y, a), (r = t.memoizedState)),
          (f = Bt || Tf(t, l, f, a, h, r, i))
            ? (b ||
                (typeof u.UNSAFE_componentWillMount != "function" &&
                  typeof u.componentWillMount != "function") ||
                (typeof u.componentWillMount == "function" &&
                  u.componentWillMount(),
                typeof u.UNSAFE_componentWillMount == "function" &&
                  u.UNSAFE_componentWillMount()),
              typeof u.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = a),
              (t.memoizedState = r)),
          (u.props = a),
          (u.state = r),
          (u.context = i),
          (a = f))
        : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
          (a = !1)));
  } else {
    ((u = t.stateNode),
      Si(e, t),
      (i = t.memoizedProps),
      (b = El(l, i)),
      (u.props = b),
      (y = t.pendingProps),
      (h = u.context),
      (r = l.contextType),
      (f = Jl),
      typeof r == "object" && r !== null && (f = Ne(r)),
      (s = l.getDerivedStateFromProps),
      (r =
        typeof s == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function") ||
        (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
          typeof u.componentWillReceiveProps != "function") ||
        ((i !== y || h !== f) && Of(t, u, a, f)),
      (Bt = !1),
      (h = t.memoizedState),
      (u.state = h),
      $a(t, a, u, n),
      Ja());
    var m = t.memoizedState;
    i !== y ||
    h !== m ||
    Bt ||
    (e !== null && e.dependencies !== null && Nu(e.dependencies))
      ? (typeof s == "function" && (yc(t, l, s, a), (m = t.memoizedState)),
        (b =
          Bt ||
          Tf(t, l, b, a, h, m, f) ||
          (e !== null && e.dependencies !== null && Nu(e.dependencies)))
          ? (r ||
              (typeof u.UNSAFE_componentWillUpdate != "function" &&
                typeof u.componentWillUpdate != "function") ||
              (typeof u.componentWillUpdate == "function" &&
                u.componentWillUpdate(a, m, f),
              typeof u.UNSAFE_componentWillUpdate == "function" &&
                u.UNSAFE_componentWillUpdate(a, m, f)),
            typeof u.componentDidUpdate == "function" && (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof u.componentDidUpdate != "function" ||
              (i === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" ||
              (i === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = a),
            (t.memoizedState = m)),
        (u.props = a),
        (u.state = m),
        (u.context = f),
        (a = b))
      : (typeof u.componentDidUpdate != "function" ||
          (i === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof u.getSnapshotBeforeUpdate != "function" ||
          (i === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (a = !1));
  }
  return (
    (u = a),
    ka(e, t),
    (a = (t.flags & 128) !== 0),
    u || a
      ? ((u = t.stateNode),
        (l =
          a && typeof l.getDerivedStateFromError != "function"
            ? null
            : u.render()),
        (t.flags |= 1),
        e !== null && a
          ? ((t.child = Al(t, e.child, null, n)), (t.child = Al(t, null, l, n)))
          : _e(e, t, l, n),
        (t.memoizedState = u.state),
        (e = t.child))
      : (e = Dt(e, t, n)),
    e
  );
}
function Hf(e, t, l, a) {
  return (Sn(), (t.flags |= 256), _e(e, t, l, a), t.child);
}
var bc = { dehydrated: null, treeContext: null, retryLane: 0 };
function gc(e) {
  return { baseLanes: e, cachePool: Xo() };
}
function pc(e, t, l) {
  return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= We), e);
}
function Cd(e, t, l) {
  var a = t.pendingProps,
    n = !1,
    u = (t.flags & 128) !== 0,
    i;
  if (
    ((i = u) ||
      (i =
        e !== null && e.memoizedState === null ? !1 : (me.current & 2) !== 0),
    i && ((n = !0), (t.flags &= -129)),
    (i = (t.flags & 32) !== 0),
    (t.flags &= -33),
    e === null)
  ) {
    if (G) {
      if ((n ? Yt(t) : wt(), G)) {
        var s = Se,
          f;
        if ((f = s)) {
          e: {
            for (f = s, s = it; f.nodeType !== 8; ) {
              if (!s) {
                s = null;
                break e;
              }
              if (((f = at(f.nextSibling)), f === null)) {
                s = null;
                break e;
              }
            }
            s = f;
          }
          s !== null
            ? ((t.memoizedState = {
                dehydrated: s,
                treeContext: yl !== null ? { id: xt, overflow: Et } : null,
                retryLane: 536870912,
              }),
              (f = $e(18, null, null, 0)),
              (f.stateNode = s),
              (f.return = t),
              (t.child = f),
              (je = t),
              (Se = null),
              (f = !0))
            : (f = !1);
        }
        f || Sl(t);
      }
      if (
        ((s = t.memoizedState), s !== null && ((s = s.dehydrated), s !== null))
      )
        return (s.data === "$!" ? (t.lanes = 16) : (t.lanes = 536870912), null);
      Nt(t);
    }
    return (
      (s = a.children),
      (a = a.fallback),
      n
        ? (wt(),
          (n = t.mode),
          (s = bi({ mode: "hidden", children: s }, n)),
          (a = gl(a, n, l, null)),
          (s.return = t),
          (a.return = t),
          (s.sibling = a),
          (t.child = s),
          (n = t.child),
          (n.memoizedState = gc(l)),
          (n.childLanes = pc(e, i, l)),
          (t.memoizedState = bc),
          a)
        : (Yt(t), yi(t, s))
    );
  }
  if (((f = e.memoizedState), f !== null && ((s = f.dehydrated), s !== null))) {
    if (u)
      t.flags & 256
        ? (Yt(t), (t.flags &= -257), (t = _c(e, t, l)))
        : t.memoizedState !== null
          ? (wt(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (wt(),
            (n = a.fallback),
            (s = t.mode),
            (a = bi({ mode: "visible", children: a.children }, s)),
            (n = gl(n, s, l, null)),
            (n.flags |= 2),
            (a.return = t),
            (n.return = t),
            (a.sibling = n),
            (t.child = a),
            Al(t, e.child, null, l),
            (a = t.child),
            (a.memoizedState = gc(l)),
            (a.childLanes = pc(e, i, l)),
            (t.memoizedState = bc),
            (t = n));
    else if ((Yt(t), s.data === "$!")) {
      if (((i = s.nextSibling && s.nextSibling.dataset), i)) var r = i.dgst;
      ((i = r),
        (a = Error(p(419))),
        (a.stack = ""),
        (a.digest = i),
        un({ value: a, source: null, stack: null }),
        (t = _c(e, t, l)));
    } else if (
      (ge || En(e, t, l, !1), (i = (l & e.childLanes) !== 0), ge || i)
    ) {
      if (((i = F), i !== null)) {
        if (((a = l & -l), a & 42)) a = 1;
        else
          switch (a) {
            case 2:
              a = 1;
              break;
            case 8:
              a = 4;
              break;
            case 32:
              a = 16;
              break;
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              a = 64;
              break;
            case 268435456:
              a = 134217728;
              break;
            default:
              a = 0;
          }
        if (
          ((a = a & (i.suspendedLanes | l) ? 0 : a),
          a !== 0 && a !== f.retryLane)
        )
          throw ((f.retryLane = a), el(e, a), Oe(i, e, a), Od);
      }
      (s.data === "$?" || Mi(), (t = _c(e, t, l)));
    } else
      s.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = km.bind(null, e)),
          (s._reactRetry = t),
          (t = null))
        : ((e = f.treeContext),
          (Se = at(s.nextSibling)),
          (je = t),
          (G = !0),
          (lt = null),
          (it = !1),
          e !== null &&
            ((Ze[ke++] = xt),
            (Ze[ke++] = Et),
            (Ze[ke++] = yl),
            (xt = e.id),
            (Et = e.overflow),
            (yl = t)),
          (t = yi(t, a.children)),
          (t.flags |= 4096));
    return t;
  }
  return n
    ? (wt(),
      (n = a.fallback),
      (s = t.mode),
      (f = e.child),
      (r = f.sibling),
      (a = Jt(f, { mode: "hidden", children: a.children })),
      (a.subtreeFlags = f.subtreeFlags & 31457280),
      r !== null ? (n = Jt(r, n)) : ((n = gl(n, s, l, null)), (n.flags |= 2)),
      (n.return = t),
      (a.return = t),
      (a.sibling = n),
      (t.child = a),
      (a = n),
      (n = t.child),
      (s = e.child.memoizedState),
      s === null
        ? (s = gc(l))
        : ((f = s.cachePool),
          f !== null
            ? ((r = he._currentValue),
              (f = f.parent !== r ? { parent: r, pool: r } : f))
            : (f = Xo()),
          (s = { baseLanes: s.baseLanes | l, cachePool: f })),
      (n.memoizedState = s),
      (n.childLanes = pc(e, i, l)),
      (t.memoizedState = bc),
      a)
    : (Yt(t),
      (l = e.child),
      (e = l.sibling),
      (l = Jt(l, { mode: "visible", children: a.children })),
      (l.return = t),
      (l.sibling = null),
      e !== null &&
        ((i = t.deletions),
        i === null ? ((t.deletions = [e]), (t.flags |= 16)) : i.push(e)),
      (t.child = l),
      (t.memoizedState = null),
      l);
}
function yi(e, t) {
  return (
    (t = bi({ mode: "visible", children: t }, e.mode)),
    (t.return = e),
    (e.child = t)
  );
}
function bi(e, t) {
  return Pd(e, t, 0, null);
}
function _c(e, t, l) {
  return (
    Al(t, e.child, null, l),
    (e = yi(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function qf(e, t, l) {
  e.lanes |= t;
  var a = e.alternate;
  (a !== null && (a.lanes |= t), pi(e.return, t, l));
}
function Sc(e, t, l, a, n) {
  var u = e.memoizedState;
  u === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: a,
        tail: l,
        tailMode: n,
      })
    : ((u.isBackwards = t),
      (u.rendering = null),
      (u.renderingStartTime = 0),
      (u.last = a),
      (u.tail = l),
      (u.tailMode = n));
}
function Rd(e, t, l) {
  var a = t.pendingProps,
    n = a.revealOrder,
    u = a.tail;
  if ((_e(e, t, a.children, l), (a = me.current), a & 2))
    ((a = (a & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && qf(e, l, t);
        else if (e.tag === 19) qf(e, l, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    a &= 1;
  }
  switch ((ee(me, a), n)) {
    case "forwards":
      for (l = t.child, n = null; l !== null; )
        ((e = l.alternate),
          e !== null && _u(e) === null && (n = l),
          (l = l.sibling));
      ((l = n),
        l === null
          ? ((n = t.child), (t.child = null))
          : ((n = l.sibling), (l.sibling = null)),
        Sc(t, !1, n, l, u));
      break;
    case "backwards":
      for (l = null, n = t.child, t.child = null; n !== null; ) {
        if (((e = n.alternate), e !== null && _u(e) === null)) {
          t.child = n;
          break;
        }
        ((e = n.sibling), (n.sibling = l), (l = n), (n = e));
      }
      Sc(t, !0, l, null, u);
      break;
    case "together":
      Sc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Dt(e, t, l) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (al |= t.lanes),
    !(l & t.childLanes))
  )
    if (e !== null) {
      if ((En(e, t, l, !1), (l & t.childLanes) === 0)) return null;
    } else return null;
  if (e !== null && t.child !== e.child) throw Error(p(153));
  if (t.child !== null) {
    for (
      e = t.child, l = Jt(e, e.pendingProps), t.child = l, l.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (l = l.sibling = Jt(e, e.pendingProps)),
        (l.return = t));
    l.sibling = null;
  }
  return t.child;
}
function _s(e, t) {
  return e.lanes & t ? !0 : ((e = e.dependencies), !!(e !== null && Nu(e)));
}
function Rm(e, t, l) {
  switch (t.tag) {
    case 3:
      (ou(t, t.stateNode.containerInfo),
        Vt(t, he, e.memoizedState.cache),
        Sn());
      break;
    case 27:
    case 5:
      Fc(t);
      break;
    case 4:
      ou(t, t.stateNode.containerInfo);
      break;
    case 10:
      Vt(t, t.type, t.memoizedProps.value);
      break;
    case 13:
      var a = t.memoizedState;
      if (a !== null)
        return a.dehydrated !== null
          ? (Yt(t), (t.flags |= 128), null)
          : l & t.child.childLanes
            ? Cd(e, t, l)
            : (Yt(t), (e = Dt(e, t, l)), e !== null ? e.sibling : null);
      Yt(t);
      break;
    case 19:
      var n = (e.flags & 128) !== 0;
      if (
        ((a = (l & t.childLanes) !== 0),
        a || (En(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
        n)
      ) {
        if (a) return Rd(e, t, l);
        t.flags |= 128;
      }
      if (
        ((n = t.memoizedState),
        n !== null &&
          ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
        ee(me, me.current),
        a)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Dd(e, t, l));
    case 24:
      Vt(t, he, e.memoizedState.cache);
  }
  return Dt(e, t, l);
}
function zd(e, t, l) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps) ge = !0;
    else {
      if (!_s(e, l) && !(t.flags & 128)) return ((ge = !1), Rm(e, t, l));
      ge = !!(e.flags & 131072);
    }
  else ((ge = !1), G && t.flags & 1048576 && Bo(t, gu, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 16:
      e: {
        e = t.pendingProps;
        var a = t.elementType,
          n = a._init;
        if (((a = n(a._payload)), (t.type = a), typeof a == "function"))
          Es(a)
            ? ((e = El(a, e)), (t.tag = 1), (t = Uf(null, t, a, e, l)))
            : ((t.tag = 0), (t = vi(null, t, a, e, l)));
        else {
          if (a != null) {
            if (((n = a.$$typeof), n === Zi)) {
              ((t.tag = 11), (t = Df(null, t, a, e, l)));
              break e;
            } else if (n === ki) {
              ((t.tag = 14), (t = Cf(null, t, a, e, l)));
              break e;
            }
          }
          throw ((t = $c(a) || a), Error(p(306, t, "")));
        }
      }
      return t;
    case 0:
      return vi(e, t, t.type, t.pendingProps, l);
    case 1:
      return ((a = t.type), (n = El(a, t.pendingProps)), Uf(e, t, a, n, l));
    case 3:
      e: {
        if ((ou(t, t.stateNode.containerInfo), e === null)) throw Error(p(387));
        var u = t.pendingProps;
        ((n = t.memoizedState), (a = n.element), Si(e, t), $a(t, u, null, l));
        var i = t.memoizedState;
        if (
          ((u = i.cache),
          Vt(t, he, u),
          u !== n.cache && _i(t, [he], l, !0),
          Ja(),
          (u = i.element),
          n.isDehydrated)
        )
          if (
            ((n = { element: u, isDehydrated: !1, cache: i.cache }),
            (t.updateQueue.baseState = n),
            (t.memoizedState = n),
            t.flags & 256)
          ) {
            t = Hf(e, t, u, l);
            break e;
          } else if (u !== a) {
            ((a = Je(Error(p(424)), t)), un(a), (t = Hf(e, t, u, l)));
            break e;
          } else
            for (
              Se = at(t.stateNode.containerInfo.firstChild),
                je = t,
                G = !0,
                lt = null,
                it = !0,
                l = Qo(t, null, u, l),
                t.child = l;
              l;
            )
              ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
        else {
          if ((Sn(), u === a)) {
            t = Dt(e, t, l);
            break e;
          }
          _e(e, t, u, l);
        }
        t = t.child;
      }
      return t;
    case 26:
      return (
        ka(e, t),
        e === null
          ? (l = er(t.type, null, t.pendingProps, null))
            ? (t.memoizedState = l)
            : G ||
              ((l = t.type),
              (e = t.pendingProps),
              (a = Ru(Zt.current).createElement(l)),
              (a[Ee] = t),
              (a[Re] = e),
              Ae(a, l, e),
              be(a),
              (t.stateNode = a))
          : (t.memoizedState = er(
              t.type,
              e.memoizedProps,
              t.pendingProps,
              e.memoizedState,
            )),
        null
      );
    case 27:
      return (
        Fc(t),
        e === null &&
          G &&
          ((a = t.stateNode = bh(t.type, t.pendingProps, Zt.current)),
          (je = t),
          (it = !0),
          (Se = at(a.firstChild))),
        (a = t.pendingProps.children),
        e !== null || G ? _e(e, t, a, l) : (t.child = Al(t, null, a, l)),
        ka(e, t),
        t.child
      );
    case 5:
      return (
        e === null &&
          G &&
          ((n = a = Se) &&
            ((a = sv(a, t.type, t.pendingProps, it)),
            a !== null
              ? ((t.stateNode = a),
                (je = t),
                (Se = at(a.firstChild)),
                (it = !1),
                (n = !0))
              : (n = !1)),
          n || Sl(t)),
        Fc(t),
        (n = t.type),
        (u = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (a = u.children),
        Ui(n, u) ? (a = null) : i !== null && Ui(n, i) && (t.flags |= 32),
        t.memoizedState !== null &&
          ((n = fs(e, t, Nm, null, null, l)), (dn._currentValue = n)),
        ka(e, t),
        _e(e, t, a, l),
        t.child
      );
    case 6:
      return (
        e === null &&
          G &&
          ((e = l = Se) &&
            ((l = fv(l, t.pendingProps, it)),
            l !== null
              ? ((t.stateNode = l), (je = t), (Se = null), (e = !0))
              : (e = !1)),
          e || Sl(t)),
        null
      );
    case 13:
      return Cd(e, t, l);
    case 4:
      return (
        ou(t, t.stateNode.containerInfo),
        (a = t.pendingProps),
        e === null ? (t.child = Al(t, null, a, l)) : _e(e, t, a, l),
        t.child
      );
    case 11:
      return Df(e, t, t.type, t.pendingProps, l);
    case 7:
      return (_e(e, t, t.pendingProps, l), t.child);
    case 8:
      return (_e(e, t, t.pendingProps.children, l), t.child);
    case 12:
      return (_e(e, t, t.pendingProps.children, l), t.child);
    case 10:
      return (
        (a = t.pendingProps),
        Vt(t, t.type, a.value),
        _e(e, t, a.children, l),
        t.child
      );
    case 9:
      return (
        (n = t.type._context),
        (a = t.pendingProps.children),
        Nl(t),
        (n = Ne(n)),
        (a = a(n)),
        (t.flags |= 1),
        _e(e, t, a, l),
        t.child
      );
    case 14:
      return Cf(e, t, t.type, t.pendingProps, l);
    case 15:
      return Md(e, t, t.type, t.pendingProps, l);
    case 19:
      return Rd(e, t, l);
    case 22:
      return Dd(e, t, l);
    case 24:
      return (
        Nl(t),
        (a = Ne(he)),
        e === null
          ? ((n = is()),
            n === null &&
              ((n = F),
              (u = cs()),
              (n.pooledCache = u),
              u.refCount++,
              u !== null && (n.pooledCacheLanes |= l),
              (n = u)),
            (t.memoizedState = { parent: a, cache: n }),
            Ss(t),
            Vt(t, he, n))
          : (e.lanes & l && (Si(e, t), $a(t, null, null, l), Ja()),
            (n = e.memoizedState),
            (u = t.memoizedState),
            n.parent !== a
              ? ((n = { parent: a, cache: a }),
                (t.memoizedState = n),
                t.lanes === 0 &&
                  (t.memoizedState = t.updateQueue.baseState = n),
                Vt(t, he, a))
              : ((a = u.cache),
                Vt(t, he, a),
                a !== n.cache && _i(t, [he], l, !0))),
        _e(e, t, t.pendingProps.children, l),
        t.child
      );
    case 29:
      throw t.pendingProps;
  }
  throw Error(p(156, t.tag));
}
var gi = ht(null),
  Cl = null,
  jt = null;
function Vt(e, t, l) {
  (ee(gi, t._currentValue), (t._currentValue = l));
}
function Tt(e) {
  ((e._currentValue = gi.current), pe(gi));
}
function pi(e, t, l) {
  for (; e !== null; ) {
    var a = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
        : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
      e === l)
    )
      break;
    e = e.return;
  }
}
function _i(e, t, l, a) {
  var n = e.child;
  for (n !== null && (n.return = e); n !== null; ) {
    var u = n.dependencies;
    if (u !== null) {
      var i = n.child;
      u = u.firstContext;
      e: for (; u !== null; ) {
        var s = u;
        u = n;
        for (var f = 0; f < t.length; f++)
          if (s.context === t[f]) {
            ((u.lanes |= l),
              (s = u.alternate),
              s !== null && (s.lanes |= l),
              pi(u.return, l, e),
              a || (i = null));
            break e;
          }
        u = s.next;
      }
    } else if (n.tag === 18) {
      if (((i = n.return), i === null)) throw Error(p(341));
      ((i.lanes |= l),
        (u = i.alternate),
        u !== null && (u.lanes |= l),
        pi(i, l, e),
        (i = null));
    } else i = n.child;
    if (i !== null) i.return = n;
    else
      for (i = n; i !== null; ) {
        if (i === e) {
          i = null;
          break;
        }
        if (((n = i.sibling), n !== null)) {
          ((n.return = i.return), (i = n));
          break;
        }
        i = i.return;
      }
    n = i;
  }
}
function En(e, t, l, a) {
  e = null;
  for (var n = t, u = !1; n !== null; ) {
    if (!u) {
      if (n.flags & 524288) u = !0;
      else if (n.flags & 262144) break;
    }
    if (n.tag === 10) {
      var i = n.alternate;
      if (i === null) throw Error(p(387));
      if (((i = i.memoizedProps), i !== null)) {
        var s = n.type;
        we(n.pendingProps.value, i.value) ||
          (e !== null ? e.push(s) : (e = [s]));
      }
    } else if (n === ru.current) {
      if (((i = n.alternate), i === null)) throw Error(p(387));
      i.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
        (e !== null ? e.push(dn) : (e = [dn]));
    }
    n = n.return;
  }
  (e !== null && _i(t, e, l, a), (t.flags |= 262144));
}
function Nu(e) {
  for (e = e.firstContext; e !== null; ) {
    if (!we(e.context._currentValue, e.memoizedValue)) return !0;
    e = e.next;
  }
  return !1;
}
function Nl(e) {
  ((Cl = e),
    (jt = null),
    (e = e.dependencies),
    e !== null && (e.firstContext = null));
}
function Ne(e) {
  return Ud(Cl, e);
}
function Yn(e, t) {
  return (Cl === null && Nl(e), Ud(e, t));
}
function Ud(e, t) {
  var l = t._currentValue;
  if (((t = { context: t, memoizedValue: l, next: null }), jt === null)) {
    if (e === null) throw Error(p(308));
    ((jt = t),
      (e.dependencies = { lanes: 0, firstContext: t }),
      (e.flags |= 524288));
  } else jt = jt.next = t;
  return l;
}
var Bt = !1;
function Ss(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function Si(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null,
      }));
}
function kt(e) {
  return { lane: e, tag: 0, payload: null, callback: null, next: null };
}
function Kt(e, t, l) {
  var a = e.updateQueue;
  if (a === null) return null;
  if (((a = a.shared), ne & 2)) {
    var n = a.pending;
    return (
      n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (a.pending = t),
      (t = yu(e)),
      Lo(e, null, l),
      t
    );
  }
  return (Ku(e, a, t, l), yu(e));
}
function Ka(e, t, l) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194176) !== 0))
  ) {
    var a = t.lanes;
    ((a &= e.pendingLanes), (l |= a), (t.lanes = l), fo(e, l));
  }
}
function Ac(e, t) {
  var l = e.updateQueue,
    a = e.alternate;
  if (a !== null && ((a = a.updateQueue), l === a)) {
    var n = null,
      u = null;
    if (((l = l.firstBaseUpdate), l !== null)) {
      do {
        var i = {
          lane: l.lane,
          tag: l.tag,
          payload: l.payload,
          callback: null,
          next: null,
        };
        (u === null ? (n = u = i) : (u = u.next = i), (l = l.next));
      } while (l !== null);
      u === null ? (n = u = t) : (u = u.next = t);
    } else n = u = t;
    ((l = {
      baseState: a.baseState,
      firstBaseUpdate: n,
      lastBaseUpdate: u,
      shared: a.shared,
      callbacks: a.callbacks,
    }),
      (e.updateQueue = l));
    return;
  }
  ((e = l.lastBaseUpdate),
    e === null ? (l.firstBaseUpdate = t) : (e.next = t),
    (l.lastBaseUpdate = t));
}
var Ai = !1;
function Ja() {
  if (Ai) {
    var e = aa;
    if (e !== null) throw e;
  }
}
function $a(e, t, l, a) {
  Ai = !1;
  var n = e.updateQueue;
  Bt = !1;
  var u = n.firstBaseUpdate,
    i = n.lastBaseUpdate,
    s = n.shared.pending;
  if (s !== null) {
    n.shared.pending = null;
    var f = s,
      r = f.next;
    ((f.next = null), i === null ? (u = r) : (i.next = r), (i = f));
    var b = e.alternate;
    b !== null &&
      ((b = b.updateQueue),
      (s = b.lastBaseUpdate),
      s !== i &&
        (s === null ? (b.firstBaseUpdate = r) : (s.next = r),
        (b.lastBaseUpdate = f)));
  }
  if (u !== null) {
    var y = n.baseState;
    ((i = 0), (b = r = f = null), (s = u));
    do {
      var h = s.lane & -536870913,
        m = h !== s.lane;
      if (m ? (V & h) === h : (a & h) === h) {
        (h !== 0 && h === oa && (Ai = !0),
          b !== null &&
            (b = b.next =
              {
                lane: 0,
                tag: s.tag,
                payload: s.payload,
                callback: null,
                next: null,
              }));
        e: {
          var A = e,
            N = s;
          h = t;
          var R = l;
          switch (N.tag) {
            case 1:
              if (((A = N.payload), typeof A == "function")) {
                y = A.call(R, y, h);
                break e;
              }
              y = A;
              break e;
            case 3:
              A.flags = (A.flags & -65537) | 128;
            case 0:
              if (
                ((A = N.payload),
                (h = typeof A == "function" ? A.call(R, y, h) : A),
                h == null)
              )
                break e;
              y = P({}, y, h);
              break e;
            case 2:
              Bt = !0;
          }
        }
        ((h = s.callback),
          h !== null &&
            ((e.flags |= 64),
            m && (e.flags |= 8192),
            (m = n.callbacks),
            m === null ? (n.callbacks = [h]) : m.push(h)));
      } else
        ((m = {
          lane: h,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          b === null ? ((r = b = m), (f = y)) : (b = b.next = m),
          (i |= h));
      if (((s = s.next), s === null)) {
        if (((s = n.shared.pending), s === null)) break;
        ((m = s),
          (s = m.next),
          (m.next = null),
          (n.lastBaseUpdate = m),
          (n.shared.pending = null));
      }
    } while (!0);
    (b === null && (f = y),
      (n.baseState = f),
      (n.firstBaseUpdate = r),
      (n.lastBaseUpdate = b),
      u === null && (n.shared.lanes = 0),
      (al |= i),
      (e.lanes = i),
      (e.memoizedState = y));
  }
}
function Hd(e, t) {
  if (typeof e != "function") throw Error(p(191, e));
  e.call(t);
}
function qd(e, t) {
  var l = e.callbacks;
  if (l !== null)
    for (e.callbacks = null, e = 0; e < l.length; e++) Hd(l[e], t);
}
function Nn(e, t) {
  try {
    var l = t.updateQueue,
      a = l !== null ? l.lastEffect : null;
    if (a !== null) {
      var n = a.next;
      l = n;
      do {
        if ((l.tag & e) === e) {
          a = void 0;
          var u = l.create,
            i = l.inst;
          ((a = u()), (i.destroy = a));
        }
        l = l.next;
      } while (l !== n);
    }
  } catch (s) {
    J(t, t.return, s);
  }
}
function ll(e, t, l) {
  try {
    var a = t.updateQueue,
      n = a !== null ? a.lastEffect : null;
    if (n !== null) {
      var u = n.next;
      a = u;
      do {
        if ((a.tag & e) === e) {
          var i = a.inst,
            s = i.destroy;
          if (s !== void 0) {
            ((i.destroy = void 0), (n = t));
            var f = l;
            try {
              s();
            } catch (r) {
              J(n, f, r);
            }
          }
        }
        a = a.next;
      } while (a !== u);
    }
  } catch (r) {
    J(t, t.return, r);
  }
}
function Ld(e) {
  var t = e.updateQueue;
  if (t !== null) {
    var l = e.stateNode;
    try {
      qd(t, l);
    } catch (a) {
      J(e, e.return, a);
    }
  }
}
function Bd(e, t, l) {
  ((l.props = El(e.type, e.memoizedProps)), (l.state = e.memoizedState));
  try {
    l.componentWillUnmount();
  } catch (a) {
    J(e, t, a);
  }
}
function ml(e, t) {
  try {
    var l = e.ref;
    if (l !== null) {
      var a = e.stateNode;
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          var n = a;
          break;
        default:
          n = a;
      }
      typeof l == "function" ? (e.refCleanup = l(n)) : (l.current = n);
    }
  } catch (u) {
    J(e, t, u);
  }
}
function qe(e, t) {
  var l = e.ref,
    a = e.refCleanup;
  if (l !== null)
    if (typeof a == "function")
      try {
        a();
      } catch (n) {
        J(e, t, n);
      } finally {
        ((e.refCleanup = null),
          (e = e.alternate),
          e != null && (e.refCleanup = null));
      }
    else if (typeof l == "function")
      try {
        l(null);
      } catch (n) {
        J(e, t, n);
      }
    else l.current = null;
}
function Yd(e) {
  var t = e.type,
    l = e.memoizedProps,
    a = e.stateNode;
  try {
    e: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        l.autoFocus && a.focus();
        break e;
      case "img":
        l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
    }
  } catch (n) {
    J(e, e.return, n);
  }
}
function Lf(e, t, l) {
  try {
    var a = e.stateNode;
    (av(a, e.type, l, t), (a[Re] = t));
  } catch (n) {
    J(e, e.return, n);
  }
}
function wd(e) {
  return (
    e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 || e.tag === 4
  );
}
function xc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || wd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 27 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function xi(e, t, l) {
  var a = e.tag;
  if (a === 5 || a === 6)
    ((e = e.stateNode),
      t
        ? l.nodeType === 8
          ? l.parentNode.insertBefore(e, t)
          : l.insertBefore(e, t)
        : (l.nodeType === 8
            ? ((t = l.parentNode), t.insertBefore(e, l))
            : ((t = l), t.appendChild(e)),
          (l = l._reactRootContainer),
          l != null || t.onclick !== null || (t.onclick = ec)));
  else if (a !== 4 && a !== 27 && ((e = e.child), e !== null))
    for (xi(e, t, l), e = e.sibling; e !== null; )
      (xi(e, t, l), (e = e.sibling));
}
function ju(e, t, l) {
  var a = e.tag;
  if (a === 5 || a === 6)
    ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
  else if (a !== 4 && a !== 27 && ((e = e.child), e !== null))
    for (ju(e, t, l), e = e.sibling; e !== null; )
      (ju(e, t, l), (e = e.sibling));
}
var pt = !1,
  ce = !1,
  Ec = !1,
  Bf = typeof WeakSet == "function" ? WeakSet : Set,
  ye = null,
  Yf = !1;
function zm(e, t) {
  if (((e = e.containerInfo), (Ri = qu), (e = Do(e)), es(e))) {
    if ("selectionStart" in e)
      var l = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        l = ((l = e.ownerDocument) && l.defaultView) || window;
        var a = l.getSelection && l.getSelection();
        if (a && a.rangeCount !== 0) {
          l = a.anchorNode;
          var n = a.anchorOffset,
            u = a.focusNode;
          a = a.focusOffset;
          try {
            (l.nodeType, u.nodeType);
          } catch {
            l = null;
            break e;
          }
          var i = 0,
            s = -1,
            f = -1,
            r = 0,
            b = 0,
            y = e,
            h = null;
          t: for (;;) {
            for (
              var m;
              y !== l || (n !== 0 && y.nodeType !== 3) || (s = i + n),
                y !== u || (a !== 0 && y.nodeType !== 3) || (f = i + a),
                y.nodeType === 3 && (i += y.nodeValue.length),
                (m = y.firstChild) !== null;
            )
              ((h = y), (y = m));
            for (;;) {
              if (y === e) break t;
              if (
                (h === l && ++r === n && (s = i),
                h === u && ++b === a && (f = i),
                (m = y.nextSibling) !== null)
              )
                break;
              ((y = h), (h = y.parentNode));
            }
            y = m;
          }
          l = s === -1 || f === -1 ? null : { start: s, end: f };
        } else l = null;
      }
    l = l || { start: 0, end: 0 };
  } else l = null;
  for (
    zi = { focusedElem: e, selectionRange: l }, qu = !1, ye = t;
    ye !== null;
  )
    if (((t = ye), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (ye = e));
    else
      for (; ye !== null; ) {
        switch (((t = ye), (u = t.alternate), (e = t.flags), t.tag)) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (e & 1024 && u !== null) {
              ((e = void 0),
                (l = t),
                (n = u.memoizedProps),
                (u = u.memoizedState),
                (a = l.stateNode));
              try {
                var A = El(l.type, n, l.elementType === l.type);
                ((e = a.getSnapshotBeforeUpdate(A, u)),
                  (a.__reactInternalSnapshotBeforeUpdate = e));
              } catch (N) {
                J(l, l.return, N);
              }
            }
            break;
          case 3:
            if (e & 1024) {
              if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9))
                Hi(e);
              else if (l === 1)
                switch (e.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    Hi(e);
                    break;
                  default:
                    e.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (e & 1024) throw Error(p(163));
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (ye = e));
          break;
        }
        ye = t.return;
      }
  return ((A = Yf), (Yf = !1), A);
}
function Vd(e, t, l) {
  var a = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      (bt(e, l), a & 4 && Nn(5, l));
      break;
    case 1:
      if ((bt(e, l), a & 4))
        if (((e = l.stateNode), t === null))
          try {
            e.componentDidMount();
          } catch (s) {
            J(l, l.return, s);
          }
        else {
          var n = El(l.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (s) {
            J(l, l.return, s);
          }
        }
      (a & 64 && Ld(l), a & 512 && ml(l, l.return));
      break;
    case 3:
      if ((bt(e, l), a & 64 && ((a = l.updateQueue), a !== null))) {
        if (((e = null), l.child !== null))
          switch (l.child.tag) {
            case 27:
            case 5:
              e = l.child.stateNode;
              break;
            case 1:
              e = l.child.stateNode;
          }
        try {
          qd(a, e);
        } catch (s) {
          J(l, l.return, s);
        }
      }
      break;
    case 26:
      (bt(e, l), a & 512 && ml(l, l.return));
      break;
    case 27:
    case 5:
      (bt(e, l), t === null && a & 4 && Yd(l), a & 512 && ml(l, l.return));
      break;
    case 12:
      bt(e, l);
      break;
    case 13:
      (bt(e, l), a & 4 && Xd(e, l));
      break;
    case 22:
      if (((n = l.memoizedState !== null || pt), !n)) {
        t = (t !== null && t.memoizedState !== null) || ce;
        var u = pt,
          i = ce;
        ((pt = n),
          (ce = t) && !i ? qt(e, l, (l.subtreeFlags & 8772) !== 0) : bt(e, l),
          (pt = u),
          (ce = i));
      }
      a & 512 &&
        (l.memoizedProps.mode === "manual" ? ml(l, l.return) : qe(l, l.return));
      break;
    default:
      bt(e, l);
  }
}
function Qd(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Qd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 && ((t = e.stateNode), t !== null && Ji(t)),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
var re = null,
  Ue = !1;
function yt(e, t, l) {
  for (l = l.child; l !== null; ) (Gd(e, t, l), (l = l.sibling));
}
function Gd(e, t, l) {
  if (Le && typeof Le.onCommitFiberUnmount == "function")
    try {
      Le.onCommitFiberUnmount(bn, l);
    } catch {}
  switch (l.tag) {
    case 26:
      (ce || qe(l, t),
        yt(e, t, l),
        l.memoizedState
          ? l.memoizedState.count--
          : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
      break;
    case 27:
      ce || qe(l, t);
      var a = re,
        n = Ue;
      for (
        re = l.stateNode, yt(e, t, l), l = l.stateNode, t = l.attributes;
        t.length;
      )
        l.removeAttributeNode(t[0]);
      (Ji(l), (re = a), (Ue = n));
      break;
    case 5:
      ce || qe(l, t);
    case 6:
      n = re;
      var u = Ue;
      if (((re = null), yt(e, t, l), (re = n), (Ue = u), re !== null))
        if (Ue)
          try {
            ((e = re),
              (a = l.stateNode),
              e.nodeType === 8
                ? e.parentNode.removeChild(a)
                : e.removeChild(a));
          } catch (i) {
            J(l, t, i);
          }
        else
          try {
            re.removeChild(l.stateNode);
          } catch (i) {
            J(l, t, i);
          }
      break;
    case 18:
      re !== null &&
        (Ue
          ? ((t = re),
            (l = l.stateNode),
            t.nodeType === 8
              ? qc(t.parentNode, l)
              : t.nodeType === 1 && qc(t, l),
            vn(t))
          : qc(re, l.stateNode));
      break;
    case 4:
      ((a = re),
        (n = Ue),
        (re = l.stateNode.containerInfo),
        (Ue = !0),
        yt(e, t, l),
        (re = a),
        (Ue = n));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      (ce || ll(2, l, t), ce || ll(4, l, t), yt(e, t, l));
      break;
    case 1:
      (ce ||
        (qe(l, t),
        (a = l.stateNode),
        typeof a.componentWillUnmount == "function" && Bd(l, t, a)),
        yt(e, t, l));
      break;
    case 21:
      yt(e, t, l);
      break;
    case 22:
      (ce || qe(l, t),
        (ce = (a = ce) || l.memoizedState !== null),
        yt(e, t, l),
        (ce = a));
      break;
    default:
      yt(e, t, l);
  }
}
function Xd(e, t) {
  if (
    t.memoizedState === null &&
    ((e = t.alternate),
    e !== null &&
      ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
  )
    try {
      vn(e);
    } catch (l) {
      J(t, t.return, l);
    }
}
function Um(e) {
  switch (e.tag) {
    case 13:
    case 19:
      var t = e.stateNode;
      return (t === null && (t = e.stateNode = new Bf()), t);
    case 22:
      return (
        (e = e.stateNode),
        (t = e._retryCache),
        t === null && (t = e._retryCache = new Bf()),
        t
      );
    default:
      throw Error(p(435, e.tag));
  }
}
function Nc(e, t) {
  var l = Um(e);
  t.forEach(function (a) {
    var n = Km.bind(null, e, a);
    l.has(a) || (l.add(a), a.then(n, n));
  });
}
function Ve(e, t) {
  var l = t.deletions;
  if (l !== null)
    for (var a = 0; a < l.length; a++) {
      var n = l[a],
        u = e,
        i = t,
        s = i;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 27:
          case 5:
            ((re = s.stateNode), (Ue = !1));
            break e;
          case 3:
            ((re = s.stateNode.containerInfo), (Ue = !0));
            break e;
          case 4:
            ((re = s.stateNode.containerInfo), (Ue = !0));
            break e;
        }
        s = s.return;
      }
      if (re === null) throw Error(p(160));
      (Gd(u, i, n),
        (re = null),
        (Ue = !1),
        (u = n.alternate),
        u !== null && (u.return = null),
        (n.return = null));
    }
  if (t.subtreeFlags & 13878)
    for (t = t.child; t !== null; ) (Zd(t, e), (t = t.sibling));
}
var tt = null;
function Zd(e, t) {
  var l = e.alternate,
    a = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      (Ve(t, e),
        Qe(e),
        a & 4 && (ll(3, e, e.return), Nn(3, e), ll(5, e, e.return)));
      break;
    case 1:
      (Ve(t, e),
        Qe(e),
        a & 512 && (ce || l === null || qe(l, l.return)),
        a & 64 &&
          pt &&
          ((e = e.updateQueue),
          e !== null &&
            ((a = e.callbacks),
            a !== null &&
              ((l = e.shared.hiddenCallbacks),
              (e.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
      break;
    case 26:
      var n = tt;
      if (
        (Ve(t, e),
        Qe(e),
        a & 512 && (ce || l === null || qe(l, l.return)),
        a & 4)
      ) {
        var u = l !== null ? l.memoizedState : null;
        if (((a = e.memoizedState), l === null))
          if (a === null)
            if (e.stateNode === null) {
              e: {
                ((a = e.type),
                  (l = e.memoizedProps),
                  (n = n.ownerDocument || n));
                t: switch (a) {
                  case "title":
                    ((u = n.getElementsByTagName("title")[0]),
                      (!u ||
                        u[tn] ||
                        u[Ee] ||
                        u.namespaceURI === "http://www.w3.org/2000/svg" ||
                        u.hasAttribute("itemprop")) &&
                        ((u = n.createElement(a)),
                        n.head.insertBefore(
                          u,
                          n.querySelector("head > title"),
                        )),
                      Ae(u, a, l),
                      (u[Ee] = e),
                      be(u),
                      (a = u));
                    break e;
                  case "link":
                    var i = lr("link", "href", n).get(a + (l.href || ""));
                    if (i) {
                      for (var s = 0; s < i.length; s++)
                        if (
                          ((u = i[s]),
                          u.getAttribute("href") ===
                            (l.href == null ? null : l.href) &&
                            u.getAttribute("rel") ===
                              (l.rel == null ? null : l.rel) &&
                            u.getAttribute("title") ===
                              (l.title == null ? null : l.title) &&
                            u.getAttribute("crossorigin") ===
                              (l.crossOrigin == null ? null : l.crossOrigin))
                        ) {
                          i.splice(s, 1);
                          break t;
                        }
                    }
                    ((u = n.createElement(a)),
                      Ae(u, a, l),
                      n.head.appendChild(u));
                    break;
                  case "meta":
                    if (
                      (i = lr("meta", "content", n).get(a + (l.content || "")))
                    ) {
                      for (s = 0; s < i.length; s++)
                        if (
                          ((u = i[s]),
                          u.getAttribute("content") ===
                            (l.content == null ? null : "" + l.content) &&
                            u.getAttribute("name") ===
                              (l.name == null ? null : l.name) &&
                            u.getAttribute("property") ===
                              (l.property == null ? null : l.property) &&
                            u.getAttribute("http-equiv") ===
                              (l.httpEquiv == null ? null : l.httpEquiv) &&
                            u.getAttribute("charset") ===
                              (l.charSet == null ? null : l.charSet))
                        ) {
                          i.splice(s, 1);
                          break t;
                        }
                    }
                    ((u = n.createElement(a)),
                      Ae(u, a, l),
                      n.head.appendChild(u));
                    break;
                  default:
                    throw Error(p(468, a));
                }
                ((u[Ee] = e), be(u), (a = u));
              }
              e.stateNode = a;
            } else ar(n, e.type, e.stateNode);
          else e.stateNode = tr(n, a, e.memoizedProps);
        else
          u !== a
            ? (u === null
                ? l.stateNode !== null &&
                  ((l = l.stateNode), l.parentNode.removeChild(l))
                : u.count--,
              a === null
                ? ar(n, e.type, e.stateNode)
                : tr(n, a, e.memoizedProps))
            : a === null &&
              e.stateNode !== null &&
              Lf(e, e.memoizedProps, l.memoizedProps);
      }
      break;
    case 27:
      if (a & 4 && e.alternate === null) {
        ((n = e.stateNode), (u = e.memoizedProps));
        try {
          for (var f = n.firstChild; f; ) {
            var r = f.nextSibling,
              b = f.nodeName;
            (f[tn] ||
              b === "HEAD" ||
              b === "BODY" ||
              b === "SCRIPT" ||
              b === "STYLE" ||
              (b === "LINK" && f.rel.toLowerCase() === "stylesheet") ||
              n.removeChild(f),
              (f = r));
          }
          for (var y = e.type, h = n.attributes; h.length; )
            n.removeAttributeNode(h[0]);
          (Ae(n, y, u), (n[Ee] = e), (n[Re] = u));
        } catch (A) {
          J(e, e.return, A);
        }
      }
    case 5:
      if (
        (Ve(t, e),
        Qe(e),
        a & 512 && (ce || l === null || qe(l, l.return)),
        e.flags & 32)
      ) {
        n = e.stateNode;
        try {
          fa(n, "");
        } catch (A) {
          J(e, e.return, A);
        }
      }
      (a & 4 &&
        e.stateNode != null &&
        ((n = e.memoizedProps), Lf(e, n, l !== null ? l.memoizedProps : n)),
        a & 1024 && (Ec = !0));
      break;
    case 6:
      if ((Ve(t, e), Qe(e), a & 4)) {
        if (e.stateNode === null) throw Error(p(162));
        ((a = e.memoizedProps), (l = e.stateNode));
        try {
          l.nodeValue = a;
        } catch (A) {
          J(e, e.return, A);
        }
      }
      break;
    case 3:
      if (
        ((cu = null),
        (n = tt),
        (tt = zu(t.containerInfo)),
        Ve(t, e),
        (tt = n),
        Qe(e),
        a & 4 && l !== null && l.memoizedState.isDehydrated)
      )
        try {
          vn(t.containerInfo);
        } catch (A) {
          J(e, e.return, A);
        }
      Ec && ((Ec = !1), kd(e));
      break;
    case 4:
      ((a = tt),
        (tt = zu(e.stateNode.containerInfo)),
        Ve(t, e),
        Qe(e),
        (tt = a));
      break;
    case 12:
      (Ve(t, e), Qe(e));
      break;
    case 13:
      (Ve(t, e),
        Qe(e),
        e.child.flags & 8192 &&
          (e.memoizedState !== null) !=
            (l !== null && l.memoizedState !== null) &&
          (Ts = rt()),
        a & 4 &&
          ((a = e.updateQueue),
          a !== null && ((e.updateQueue = null), Nc(e, a))));
      break;
    case 22:
      if (
        (a & 512 && (ce || l === null || qe(l, l.return)),
        (f = e.memoizedState !== null),
        (r = l !== null && l.memoizedState !== null),
        (b = pt),
        (y = ce),
        (pt = b || f),
        (ce = y || r),
        Ve(t, e),
        (ce = y),
        (pt = b),
        Qe(e),
        (t = e.stateNode),
        (t._current = e),
        (t._visibility &= -3),
        (t._visibility |= t._pendingVisibility & 2),
        a & 8192 &&
          ((t._visibility = f ? t._visibility & -2 : t._visibility | 1),
          f && ((t = pt || ce), l === null || r || t || Bl(e)),
          e.memoizedProps === null || e.memoizedProps.mode !== "manual"))
      )
        e: for (l = null, t = e; ; ) {
          if (t.tag === 5 || t.tag === 26 || t.tag === 27) {
            if (l === null) {
              r = l = t;
              try {
                if (((n = r.stateNode), f))
                  ((u = n.style),
                    typeof u.setProperty == "function"
                      ? u.setProperty("display", "none", "important")
                      : (u.display = "none"));
                else {
                  ((i = r.stateNode), (s = r.memoizedProps.style));
                  var m =
                    s != null && s.hasOwnProperty("display") ? s.display : null;
                  i.style.display =
                    m == null || typeof m == "boolean" ? "" : ("" + m).trim();
                }
              } catch (A) {
                J(r, r.return, A);
              }
            }
          } else if (t.tag === 6) {
            if (l === null) {
              r = t;
              try {
                r.stateNode.nodeValue = f ? "" : r.memoizedProps;
              } catch (A) {
                J(r, r.return, A);
              }
            }
          } else if (
            ((t.tag !== 22 && t.tag !== 23) ||
              t.memoizedState === null ||
              t === e) &&
            t.child !== null
          ) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === e) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break e;
            (l === t && (l = null), (t = t.return));
          }
          (l === t && (l = null),
            (t.sibling.return = t.return),
            (t = t.sibling));
        }
      a & 4 &&
        ((a = e.updateQueue),
        a !== null &&
          ((l = a.retryQueue),
          l !== null && ((a.retryQueue = null), Nc(e, l))));
      break;
    case 19:
      (Ve(t, e),
        Qe(e),
        a & 4 &&
          ((a = e.updateQueue),
          a !== null && ((e.updateQueue = null), Nc(e, a))));
      break;
    case 21:
      break;
    default:
      (Ve(t, e), Qe(e));
  }
}
function Qe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      if (e.tag !== 27) {
        e: {
          for (var l = e.return; l !== null; ) {
            if (wd(l)) {
              var a = l;
              break e;
            }
            l = l.return;
          }
          throw Error(p(160));
        }
        switch (a.tag) {
          case 27:
            var n = a.stateNode,
              u = xc(e);
            ju(e, u, n);
            break;
          case 5:
            var i = a.stateNode;
            a.flags & 32 && (fa(i, ""), (a.flags &= -33));
            var s = xc(e);
            ju(e, s, i);
            break;
          case 3:
          case 4:
            var f = a.stateNode.containerInfo,
              r = xc(e);
            xi(e, r, f);
            break;
          default:
            throw Error(p(161));
        }
      }
    } catch (b) {
      J(e, e.return, b);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function kd(e) {
  if (e.subtreeFlags & 1024)
    for (e = e.child; e !== null; ) {
      var t = e;
      (kd(t),
        t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
        (e = e.sibling));
    }
}
function bt(e, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; ) (Vd(e, t.alternate, t), (t = t.sibling));
}
function Bl(e) {
  for (e = e.child; e !== null; ) {
    var t = e;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ll(4, t, t.return), Bl(t));
        break;
      case 1:
        qe(t, t.return);
        var l = t.stateNode;
        (typeof l.componentWillUnmount == "function" && Bd(t, t.return, l),
          Bl(t));
        break;
      case 26:
      case 27:
      case 5:
        (qe(t, t.return), Bl(t));
        break;
      case 22:
        (qe(t, t.return), t.memoizedState === null && Bl(t));
        break;
      default:
        Bl(t);
    }
    e = e.sibling;
  }
}
function qt(e, t, l) {
  for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var a = t.alternate,
      n = e,
      u = t,
      i = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        (qt(n, u, l), Nn(4, u));
        break;
      case 1:
        if (
          (qt(n, u, l),
          (a = u),
          (n = a.stateNode),
          typeof n.componentDidMount == "function")
        )
          try {
            n.componentDidMount();
          } catch (r) {
            J(a, a.return, r);
          }
        if (((a = u), (n = a.updateQueue), n !== null)) {
          var s = a.stateNode;
          try {
            var f = n.shared.hiddenCallbacks;
            if (f !== null)
              for (n.shared.hiddenCallbacks = null, n = 0; n < f.length; n++)
                Hd(f[n], s);
          } catch (r) {
            J(a, a.return, r);
          }
        }
        (l && i & 64 && Ld(u), ml(u, u.return));
        break;
      case 26:
      case 27:
      case 5:
        (qt(n, u, l), l && a === null && i & 4 && Yd(u), ml(u, u.return));
        break;
      case 12:
        qt(n, u, l);
        break;
      case 13:
        (qt(n, u, l), l && i & 4 && Xd(n, u));
        break;
      case 22:
        (u.memoizedState === null && qt(n, u, l), ml(u, u.return));
        break;
      default:
        qt(n, u, l);
    }
    t = t.sibling;
  }
}
function As(e, t) {
  var l = null;
  (e !== null &&
    e.memoizedState !== null &&
    e.memoizedState.cachePool !== null &&
    (l = e.memoizedState.cachePool.pool),
    (e = null),
    t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (e = t.memoizedState.cachePool.pool),
    e !== l && (e != null && e.refCount++, l != null && An(l)));
}
function xs(e, t) {
  ((e = null),
    t.alternate !== null && (e = t.alternate.memoizedState.cache),
    (t = t.memoizedState.cache),
    t !== e && (t.refCount++, e != null && An(e)));
}
function Ut(e, t, l, a) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) (Kd(e, t, l, a), (t = t.sibling));
}
function Kd(e, t, l, a) {
  var n = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      (Ut(e, t, l, a), n & 2048 && Nn(9, t));
      break;
    case 3:
      (Ut(e, t, l, a),
        n & 2048 &&
          ((e = null),
          t.alternate !== null && (e = t.alternate.memoizedState.cache),
          (t = t.memoizedState.cache),
          t !== e && (t.refCount++, e != null && An(e))));
      break;
    case 12:
      if (n & 2048) {
        (Ut(e, t, l, a), (e = t.stateNode));
        try {
          var u = t.memoizedProps,
            i = u.id,
            s = u.onPostCommit;
          typeof s == "function" &&
            s(
              i,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0,
            );
        } catch (f) {
          J(t, t.return, f);
        }
      } else Ut(e, t, l, a);
      break;
    case 23:
      break;
    case 22:
      ((u = t.stateNode),
        t.memoizedState !== null
          ? u._visibility & 4
            ? Ut(e, t, l, a)
            : Wa(e, t)
          : u._visibility & 4
            ? Ut(e, t, l, a)
            : ((u._visibility |= 4),
              Yl(e, t, l, a, (t.subtreeFlags & 10256) !== 0)),
        n & 2048 && As(t.alternate, t));
      break;
    case 24:
      (Ut(e, t, l, a), n & 2048 && xs(t.alternate, t));
      break;
    default:
      Ut(e, t, l, a);
  }
}
function Yl(e, t, l, a, n) {
  for (n = n && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
    var u = e,
      i = t,
      s = l,
      f = a,
      r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        (Yl(u, i, s, f, n), Nn(8, i));
        break;
      case 23:
        break;
      case 22:
        var b = i.stateNode;
        (i.memoizedState !== null
          ? b._visibility & 4
            ? Yl(u, i, s, f, n)
            : Wa(u, i)
          : ((b._visibility |= 4), Yl(u, i, s, f, n)),
          n && r & 2048 && As(i.alternate, i));
        break;
      case 24:
        (Yl(u, i, s, f, n), n && r & 2048 && xs(i.alternate, i));
        break;
      default:
        Yl(u, i, s, f, n);
    }
    t = t.sibling;
  }
}
function Wa(e, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var l = e,
        a = t,
        n = a.flags;
      switch (a.tag) {
        case 22:
          (Wa(l, a), n & 2048 && As(a.alternate, a));
          break;
        case 24:
          (Wa(l, a), n & 2048 && xs(a.alternate, a));
          break;
        default:
          Wa(l, a);
      }
      t = t.sibling;
    }
}
var qa = 8192;
function Rl(e) {
  if (e.subtreeFlags & qa)
    for (e = e.child; e !== null; ) (Jd(e), (e = e.sibling));
}
function Jd(e) {
  switch (e.tag) {
    case 26:
      (Rl(e),
        e.flags & qa &&
          e.memoizedState !== null &&
          Av(tt, e.memoizedState, e.memoizedProps));
      break;
    case 5:
      Rl(e);
      break;
    case 3:
    case 4:
      var t = tt;
      ((tt = zu(e.stateNode.containerInfo)), Rl(e), (tt = t));
      break;
    case 22:
      e.memoizedState === null &&
        ((t = e.alternate),
        t !== null && t.memoizedState !== null
          ? ((t = qa), (qa = 16777216), Rl(e), (qa = t))
          : Rl(e));
      break;
    default:
      Rl(e);
  }
}
function $d(e) {
  var t = e.alternate;
  if (t !== null && ((e = t.child), e !== null)) {
    t.child = null;
    do ((t = e.sibling), (e.sibling = null), (e = t));
    while (e !== null);
  }
}
function Oa(e) {
  var t = e.deletions;
  if (e.flags & 16) {
    if (t !== null)
      for (var l = 0; l < t.length; l++) {
        var a = t[l];
        ((ye = a), Fd(a, e));
      }
    $d(e);
  }
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) (Wd(e), (e = e.sibling));
}
function Wd(e) {
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      (Oa(e), e.flags & 2048 && ll(9, e, e.return));
      break;
    case 3:
      Oa(e);
      break;
    case 12:
      Oa(e);
      break;
    case 22:
      var t = e.stateNode;
      e.memoizedState !== null &&
      t._visibility & 4 &&
      (e.return === null || e.return.tag !== 13)
        ? ((t._visibility &= -5), au(e))
        : Oa(e);
      break;
    default:
      Oa(e);
  }
}
function au(e) {
  var t = e.deletions;
  if (e.flags & 16) {
    if (t !== null)
      for (var l = 0; l < t.length; l++) {
        var a = t[l];
        ((ye = a), Fd(a, e));
      }
    $d(e);
  }
  for (e = e.child; e !== null; ) {
    switch (((t = e), t.tag)) {
      case 0:
      case 11:
      case 15:
        (ll(8, t, t.return), au(t));
        break;
      case 22:
        ((l = t.stateNode),
          l._visibility & 4 && ((l._visibility &= -5), au(t)));
        break;
      default:
        au(t);
    }
    e = e.sibling;
  }
}
function Fd(e, t) {
  for (; ye !== null; ) {
    var l = ye;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ll(8, l, t);
        break;
      case 23:
      case 22:
        if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
          var a = l.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        An(l.memoizedState.cache);
    }
    if (((a = l.child), a !== null)) ((a.return = l), (ye = a));
    else
      e: for (l = e; ye !== null; ) {
        a = ye;
        var n = a.sibling,
          u = a.return;
        if ((Qd(a), a === l)) {
          ye = null;
          break e;
        }
        if (n !== null) {
          ((n.return = u), (ye = n));
          break e;
        }
        ye = u;
      }
  }
}
function Hm(e, t, l, a) {
  ((this.tag = e),
    (this.key = l),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = a),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function $e(e, t, l, a) {
  return new Hm(e, t, l, a);
}
function Es(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Jt(e, t) {
  var l = e.alternate;
  return (
    l === null
      ? ((l = $e(e.tag, t, e.key, e.mode)),
        (l.elementType = e.elementType),
        (l.type = e.type),
        (l.stateNode = e.stateNode),
        (l.alternate = e),
        (e.alternate = l))
      : ((l.pendingProps = t),
        (l.type = e.type),
        (l.flags = 0),
        (l.subtreeFlags = 0),
        (l.deletions = null)),
    (l.flags = e.flags & 31457280),
    (l.childLanes = e.childLanes),
    (l.lanes = e.lanes),
    (l.child = e.child),
    (l.memoizedProps = e.memoizedProps),
    (l.memoizedState = e.memoizedState),
    (l.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (l.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (l.sibling = e.sibling),
    (l.index = e.index),
    (l.ref = e.ref),
    (l.refCleanup = e.refCleanup),
    l
  );
}
function Id(e, t) {
  e.flags &= 31457282;
  var l = e.alternate;
  return (
    l === null
      ? ((e.childLanes = 0),
        (e.lanes = t),
        (e.child = null),
        (e.subtreeFlags = 0),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.stateNode = null))
      : ((e.childLanes = l.childLanes),
        (e.lanes = l.lanes),
        (e.child = l.child),
        (e.subtreeFlags = 0),
        (e.deletions = null),
        (e.memoizedProps = l.memoizedProps),
        (e.memoizedState = l.memoizedState),
        (e.updateQueue = l.updateQueue),
        (e.type = l.type),
        (t = l.dependencies),
        (e.dependencies =
          t === null
            ? null
            : { lanes: t.lanes, firstContext: t.firstContext })),
    e
  );
}
function nu(e, t, l, a, n, u) {
  var i = 0;
  if (((a = e), typeof e == "function")) Es(e) && (i = 1);
  else if (typeof e == "string")
    i = _v(e, l, ft.current)
      ? 26
      : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
  else
    e: switch (e) {
      case Vl:
        return gl(l.children, n, u, t);
      case Ir:
        ((i = 8), (n |= 24));
        break;
      case kc:
        return (
          (e = $e(12, l, t, n | 2)),
          (e.elementType = kc),
          (e.lanes = u),
          e
        );
      case Kc:
        return ((e = $e(13, l, t, n)), (e.elementType = Kc), (e.lanes = u), e);
      case Jc:
        return ((e = $e(19, l, t, n)), (e.elementType = Jc), (e.lanes = u), e);
      case eo:
        return Pd(l, n, u, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case c0:
            case At:
              i = 10;
              break e;
            case Pr:
              i = 9;
              break e;
            case Zi:
              i = 11;
              break e;
            case ki:
              i = 14;
              break e;
            case Lt:
              ((i = 16), (a = null));
              break e;
          }
        ((i = 29),
          (l = Error(p(130, e === null ? "null" : typeof e, ""))),
          (a = null));
    }
  return (
    (t = $e(i, l, t, n)),
    (t.elementType = e),
    (t.type = a),
    (t.lanes = u),
    t
  );
}
function gl(e, t, l, a) {
  return ((e = $e(7, e, a, t)), (e.lanes = l), e);
}
function Pd(e, t, l, a) {
  ((e = $e(22, e, a, t)), (e.elementType = eo), (e.lanes = l));
  var n = {
    _visibility: 1,
    _pendingVisibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null,
    _current: null,
    detach: function () {
      var u = n._current;
      if (u === null) throw Error(p(456));
      if (!(n._pendingVisibility & 2)) {
        var i = el(u, 2);
        i !== null && ((n._pendingVisibility |= 2), Oe(i, u, 2));
      }
    },
    attach: function () {
      var u = n._current;
      if (u === null) throw Error(p(456));
      if (n._pendingVisibility & 2) {
        var i = el(u, 2);
        i !== null && ((n._pendingVisibility &= -3), Oe(i, u, 2));
      }
    },
  };
  return ((e.stateNode = n), e);
}
function jc(e, t, l) {
  return ((e = $e(6, e, null, t)), (e.lanes = l), e);
}
function Tc(e, t, l) {
  return (
    (t = $e(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = l),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function gt(e) {
  e.flags |= 4;
}
function wf(e, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
  else if (((e.flags |= 16777216), !_h(t))) {
    if (
      ((t = Fe.current),
      t !== null &&
        ((V & 4194176) === V
          ? ot !== null
          : ((V & 62914560) !== V && !(V & 536870912)) || t !== ot))
    )
      throw ((Ga = ii), Yo);
    e.flags |= 8192;
  }
}
function wn(e, t) {
  (t !== null && (e.flags |= 4),
    e.flags & 16384 &&
      ((t = e.tag !== 22 ? io() : 536870912), (e.lanes |= t), (ha |= t)));
}
function Ma(e, t) {
  if (!G)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var l = null; t !== null; )
          (t.alternate !== null && (l = t), (t = t.sibling));
        l === null ? (e.tail = null) : (l.sibling = null);
        break;
      case "collapsed":
        l = e.tail;
        for (var a = null; l !== null; )
          (l.alternate !== null && (a = l), (l = l.sibling));
        a === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (a.sibling = null);
    }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    l = 0,
    a = 0;
  if (t)
    for (var n = e.child; n !== null; )
      ((l |= n.lanes | n.childLanes),
        (a |= n.subtreeFlags & 31457280),
        (a |= n.flags & 31457280),
        (n.return = e),
        (n = n.sibling));
  else
    for (n = e.child; n !== null; )
      ((l |= n.lanes | n.childLanes),
        (a |= n.subtreeFlags),
        (a |= n.flags),
        (n.return = e),
        (n = n.sibling));
  return ((e.subtreeFlags |= a), (e.childLanes = l), t);
}
function qm(e, t, l) {
  var a = t.pendingProps;
  switch ((ns(t), t.tag)) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (le(t), null);
    case 1:
      return (le(t), null);
    case 3:
      return (
        (l = t.stateNode),
        (a = null),
        e !== null && (a = e.memoizedState.cache),
        t.memoizedState.cache !== a && (t.flags |= 2048),
        Tt(he),
        ia(),
        l.pendingContext &&
          ((l.context = l.pendingContext), (l.pendingContext = null)),
        (e === null || e.child === null) &&
          (ja(t)
            ? gt(t)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), lt !== null && (Oi(lt), (lt = null)))),
        le(t),
        null
      );
    case 26:
      return (
        (l = t.memoizedState),
        e === null
          ? (gt(t),
            l !== null ? (le(t), wf(t, l)) : (le(t), (t.flags &= -16777217)))
          : l
            ? l !== e.memoizedState
              ? (gt(t), le(t), wf(t, l))
              : (le(t), (t.flags &= -16777217))
            : (e.memoizedProps !== a && gt(t), le(t), (t.flags &= -16777217)),
        null
      );
    case 27:
      (du(t), (l = Zt.current));
      var n = t.type;
      if (e !== null && t.stateNode != null) e.memoizedProps !== a && gt(t);
      else {
        if (!a) {
          if (t.stateNode === null) throw Error(p(166));
          return (le(t), null);
        }
        ((e = ft.current),
          ja(t) ? yf(t) : ((e = bh(n, a, l)), (t.stateNode = e), gt(t)));
      }
      return (le(t), null);
    case 5:
      if ((du(t), (l = t.type), e !== null && t.stateNode != null))
        e.memoizedProps !== a && gt(t);
      else {
        if (!a) {
          if (t.stateNode === null) throw Error(p(166));
          return (le(t), null);
        }
        if (((e = ft.current), ja(t))) yf(t);
        else {
          switch (((n = Ru(Zt.current)), e)) {
            case 1:
              e = n.createElementNS("http://www.w3.org/2000/svg", l);
              break;
            case 2:
              e = n.createElementNS("http://www.w3.org/1998/Math/MathML", l);
              break;
            default:
              switch (l) {
                case "svg":
                  e = n.createElementNS("http://www.w3.org/2000/svg", l);
                  break;
                case "math":
                  e = n.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    l,
                  );
                  break;
                case "script":
                  ((e = n.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)));
                  break;
                case "select":
                  ((e =
                    typeof a.is == "string"
                      ? n.createElement("select", { is: a.is })
                      : n.createElement("select")),
                    a.multiple
                      ? (e.multiple = !0)
                      : a.size && (e.size = a.size));
                  break;
                default:
                  e =
                    typeof a.is == "string"
                      ? n.createElement(l, { is: a.is })
                      : n.createElement(l);
              }
          }
          ((e[Ee] = t), (e[Re] = a));
          e: for (n = t.child; n !== null; ) {
            if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
            else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              n = n.return;
            }
            ((n.sibling.return = n.return), (n = n.sibling));
          }
          t.stateNode = e;
          e: switch ((Ae(e, l, a), l)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              e = !!a.autoFocus;
              break e;
            case "img":
              e = !0;
              break e;
            default:
              e = !1;
          }
          e && gt(t);
        }
      }
      return (le(t), (t.flags &= -16777217), null);
    case 6:
      if (e && t.stateNode != null) e.memoizedProps !== a && gt(t);
      else {
        if (typeof a != "string" && t.stateNode === null) throw Error(p(166));
        if (((e = Zt.current), ja(t))) {
          if (
            ((e = t.stateNode),
            (l = t.memoizedProps),
            (a = null),
            (n = je),
            n !== null)
          )
            switch (n.tag) {
              case 27:
              case 5:
                a = n.memoizedProps;
            }
          ((e[Ee] = t),
            (e = !!(
              e.nodeValue === l ||
              (a !== null && a.suppressHydrationWarning === !0) ||
              mh(e.nodeValue, l)
            )),
            e || Sl(t));
        } else ((e = Ru(e).createTextNode(a)), (e[Ee] = t), (t.stateNode = e));
      }
      return (le(t), null);
    case 13:
      if (
        ((a = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (((n = ja(t)), a !== null && a.dehydrated !== null)) {
          if (e === null) {
            if (!n) throw Error(p(318));
            if (
              ((n = t.memoizedState),
              (n = n !== null ? n.dehydrated : null),
              !n)
            )
              throw Error(p(317));
            n[Ee] = t;
          } else
            (Sn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (le(t), (n = !1));
        } else (lt !== null && (Oi(lt), (lt = null)), (n = !0));
        if (!n) return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
      }
      if ((Nt(t), t.flags & 128)) return ((t.lanes = l), t);
      if (((l = a !== null), (e = e !== null && e.memoizedState !== null), l)) {
        ((a = t.child),
          (n = null),
          a.alternate !== null &&
            a.alternate.memoizedState !== null &&
            a.alternate.memoizedState.cachePool !== null &&
            (n = a.alternate.memoizedState.cachePool.pool));
        var u = null;
        (a.memoizedState !== null &&
          a.memoizedState.cachePool !== null &&
          (u = a.memoizedState.cachePool.pool),
          u !== n && (a.flags |= 2048));
      }
      return (
        l !== e && l && (t.child.flags |= 8192),
        wn(t, t.updateQueue),
        le(t),
        null
      );
    case 4:
      return (ia(), e === null && Ds(t.stateNode.containerInfo), le(t), null);
    case 10:
      return (Tt(t.type), le(t), null);
    case 19:
      if ((pe(me), (n = t.memoizedState), n === null)) return (le(t), null);
      if (((a = (t.flags & 128) !== 0), (u = n.rendering), u === null))
        if (a) Ma(n, !1);
        else {
          if (ie !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((u = _u(e)), u !== null)) {
                for (
                  t.flags |= 128,
                    Ma(n, !1),
                    e = u.updateQueue,
                    t.updateQueue = e,
                    wn(t, e),
                    t.subtreeFlags = 0,
                    e = l,
                    l = t.child;
                  l !== null;
                )
                  (Id(l, e), (l = l.sibling));
                return (ee(me, (me.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          n.tail !== null &&
            rt() > Tu &&
            ((t.flags |= 128), (a = !0), Ma(n, !1), (t.lanes = 4194304));
        }
      else {
        if (!a)
          if (((e = _u(u)), e !== null)) {
            if (
              ((t.flags |= 128),
              (a = !0),
              (e = e.updateQueue),
              (t.updateQueue = e),
              wn(t, e),
              Ma(n, !0),
              n.tail === null && n.tailMode === "hidden" && !u.alternate && !G)
            )
              return (le(t), null);
          } else
            2 * rt() - n.renderingStartTime > Tu &&
              l !== 536870912 &&
              ((t.flags |= 128), (a = !0), Ma(n, !1), (t.lanes = 4194304));
        n.isBackwards
          ? ((u.sibling = t.child), (t.child = u))
          : ((e = n.last),
            e !== null ? (e.sibling = u) : (t.child = u),
            (n.last = u));
      }
      return n.tail !== null
        ? ((t = n.tail),
          (n.rendering = t),
          (n.tail = t.sibling),
          (n.renderingStartTime = rt()),
          (t.sibling = null),
          (e = me.current),
          ee(me, a ? (e & 1) | 2 : e & 1),
          t)
        : (le(t), null);
    case 22:
    case 23:
      return (
        Nt(t),
        us(),
        (a = t.memoizedState !== null),
        e !== null
          ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
          : a && (t.flags |= 8192),
        a
          ? l & 536870912 &&
            !(t.flags & 128) &&
            (le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : le(t),
        (l = t.updateQueue),
        l !== null && wn(t, l.retryQueue),
        (l = null),
        e !== null &&
          e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (l = e.memoizedState.cachePool.pool),
        (a = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (a = t.memoizedState.cachePool.pool),
        a !== l && (t.flags |= 2048),
        e !== null && pe(bl),
        null
      );
    case 24:
      return (
        (l = null),
        e !== null && (l = e.memoizedState.cache),
        t.memoizedState.cache !== l && (t.flags |= 2048),
        Tt(he),
        le(t),
        null
      );
    case 25:
      return null;
  }
  throw Error(p(156, t.tag));
}
function Lm(e, t) {
  switch ((ns(t), t.tag)) {
    case 1:
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Tt(he),
        ia(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 26:
    case 27:
    case 5:
      return (du(t), null);
    case 13:
      if ((Nt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(p(340));
        Sn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (pe(me), null);
    case 4:
      return (ia(), null);
    case 10:
      return (Tt(t.type), null);
    case 22:
    case 23:
      return (
        Nt(t),
        us(),
        e !== null && pe(bl),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 24:
      return (Tt(he), null);
    case 25:
      return null;
    default:
      return null;
  }
}
function eh(e, t) {
  switch ((ns(t), t.tag)) {
    case 3:
      (Tt(he), ia());
      break;
    case 26:
    case 27:
    case 5:
      du(t);
      break;
    case 4:
      ia();
      break;
    case 13:
      Nt(t);
      break;
    case 19:
      pe(me);
      break;
    case 10:
      Tt(t.type);
      break;
    case 22:
    case 23:
      (Nt(t), us(), e !== null && pe(bl));
      break;
    case 24:
      Tt(he);
  }
}
var Bm = {
    getCacheForType: function (e) {
      var t = Ne(he),
        l = t.data.get(e);
      return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
    },
  },
  Ym = typeof WeakMap == "function" ? WeakMap : Map,
  ne = 0,
  F = null,
  B = null,
  V = 0,
  W = 0,
  He = null,
  _t = !1,
  _a = !1,
  Ns = !1,
  Ct = 0,
  ie = 0,
  al = 0,
  pl = 0,
  js = 0,
  We = 0,
  ha = 0,
  Fa = null,
  st = null,
  Ei = !1,
  Ts = 0,
  Tu = 1 / 0,
  Ou = null,
  $t = null,
  Vn = !1,
  ol = null,
  Ia = 0,
  Ni = 0,
  ji = null,
  Pa = 0,
  Ti = null;
function Ye() {
  if (ne & 2 && V !== 0) return V & -V;
  if (H.T !== null) {
    var e = oa;
    return e !== 0 ? e : Ms();
  }
  return oo();
}
function th() {
  We === 0 && (We = !(V & 536870912) || G ? co() : 536870912);
  var e = Fe.current;
  return (e !== null && (e.flags |= 32), We);
}
function Oe(e, t, l) {
  (((e === F && W === 2) || e.cancelPendingCommit !== null) &&
    (ma(e, 0), St(e, V, We, !1)),
    pn(e, l),
    (!(ne & 2) || e !== F) &&
      (e === F && (!(ne & 2) && (pl |= l), ie === 4 && St(e, V, We, !1)),
      mt(e)));
}
function lh(e, t, l) {
  if (ne & 6) throw Error(p(327));
  var a = (!l && (t & 60) === 0 && (t & e.expiredLanes) === 0) || gn(e, t),
    n = a ? Qm(e, t) : Oc(e, t, !0),
    u = a;
  do {
    if (n === 0) {
      _a && !a && St(e, t, 0, !1);
      break;
    } else if (n === 6) St(e, t, 0, !_t);
    else {
      if (((l = e.current.alternate), u && !wm(l))) {
        ((n = Oc(e, t, !1)), (u = !1));
        continue;
      }
      if (n === 2) {
        if (((u = t), e.errorRecoveryDisabledLanes & u)) var i = 0;
        else
          ((i = e.pendingLanes & -536870913),
            (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
        if (i !== 0) {
          t = i;
          e: {
            var s = e;
            n = Fa;
            var f = s.current.memoizedState.isDehydrated;
            if ((f && (ma(s, i).flags |= 256), (i = Oc(s, i, !1)), i !== 2)) {
              if (Ns && !f) {
                ((s.errorRecoveryDisabledLanes |= u), (pl |= u), (n = 4));
                break e;
              }
              ((u = st), (st = n), u !== null && Oi(u));
            }
            n = i;
          }
          if (((u = !1), n !== 2)) continue;
        }
      }
      if (n === 1) {
        (ma(e, 0), St(e, t, 0, !0));
        break;
      }
      e: {
        switch (((a = e), n)) {
          case 0:
          case 1:
            throw Error(p(345));
          case 4:
            if ((t & 4194176) === t) {
              St(a, t, We, !_t);
              break e;
            }
            break;
          case 2:
            st = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(p(329));
        }
        if (
          ((a.finishedWork = l),
          (a.finishedLanes = t),
          (t & 62914560) === t && ((u = Ts + 300 - rt()), 10 < u))
        ) {
          if ((St(a, t, We, !_t), Qu(a, 0) !== 0)) break e;
          a.timeoutHandle = yh(
            Vf.bind(null, a, l, st, Ou, Ei, t, We, pl, ha, _t, 2, -0, 0),
            u,
          );
          break e;
        }
        Vf(a, l, st, Ou, Ei, t, We, pl, ha, _t, 0, -0, 0);
      }
    }
    break;
  } while (!0);
  mt(e);
}
function Oi(e) {
  st === null ? (st = e) : st.push.apply(st, e);
}
function Vf(e, t, l, a, n, u, i, s, f, r, b, y, h) {
  var m = t.subtreeFlags;
  if (
    (m & 8192 || (m & 16785408) === 16785408) &&
    ((on = { stylesheets: null, count: 0, unsuspend: Sv }),
    Jd(t),
    (t = xv()),
    t !== null)
  ) {
    ((e.cancelPendingCommit = t(Gf.bind(null, e, l, a, n, i, s, f, 1, y, h))),
      St(e, u, i, !r));
    return;
  }
  Gf(e, l, a, n, i, s, f, b, y, h);
}
function wm(e) {
  for (var t = e; ; ) {
    var l = t.tag;
    if (
      (l === 0 || l === 11 || l === 15) &&
      t.flags & 16384 &&
      ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
    )
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          u = n.getSnapshot;
        n = n.value;
        try {
          if (!we(u(), n)) return !1;
        } catch {
          return !1;
        }
      }
    if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
      ((l.return = t), (t = l));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function St(e, t, l, a) {
  ((t &= ~js),
    (t &= ~pl),
    (e.suspendedLanes |= t),
    (e.pingedLanes &= ~t),
    a && (e.warmLanes |= t),
    (a = e.expirationTimes));
  for (var n = t; 0 < n; ) {
    var u = 31 - Be(n),
      i = 1 << u;
    ((a[u] = -1), (n &= ~i));
  }
  l !== 0 && so(e, l, t);
}
function Iu() {
  return ne & 6 ? !0 : (jn(0), !1);
}
function Os() {
  if (B !== null) {
    if (W === 0) var e = B.return;
    else ((e = B), (jt = Cl = null), ds(e), (la = null), (cn = 0), (e = B));
    for (; e !== null; ) (eh(e.alternate, e), (e = e.return));
    B = null;
  }
}
function ma(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var l = e.timeoutHandle;
  (l !== -1 && ((e.timeoutHandle = -1), uv(l)),
    (l = e.cancelPendingCommit),
    l !== null && ((e.cancelPendingCommit = null), l()),
    Os(),
    (F = e),
    (B = l = Jt(e.current, null)),
    (V = t),
    (W = 0),
    (He = null),
    (_t = !1),
    (_a = gn(e, t)),
    (Ns = !1),
    (ha = We = js = pl = al = ie = 0),
    (st = Fa = null),
    (Ei = !1),
    t & 8 && (t |= t & 32));
  var a = e.entangledLanes;
  if (a !== 0)
    for (e = e.entanglements, a &= t; 0 < a; ) {
      var n = 31 - Be(a),
        u = 1 << n;
      ((t |= e[n]), (a &= ~u));
    }
  return ((Ct = t), ku(), l);
}
function ah(e, t) {
  ((L = null),
    (H.H = dt),
    t === Qa
      ? ((t = pf()), (W = 3))
      : t === Yo
        ? ((t = pf()), (W = 4))
        : (W =
            t === Od
              ? 8
              : t !== null &&
                  typeof t == "object" &&
                  typeof t.then == "function"
                ? 6
                : 1),
    (He = t),
    B === null && ((ie = 1), Eu(e, Je(t, e.current))));
}
function nh() {
  var e = H.H;
  return ((H.H = dt), e === null ? dt : e);
}
function uh() {
  var e = H.A;
  return ((H.A = Bm), e);
}
function Mi() {
  ((ie = 4),
    _t || ((V & 4194176) !== V && Fe.current !== null) || (_a = !0),
    (!(al & 134217727) && !(pl & 134217727)) || F === null || St(F, V, We, !1));
}
function Oc(e, t, l) {
  var a = ne;
  ne |= 2;
  var n = nh(),
    u = uh();
  ((F !== e || V !== t) && ((Ou = null), ma(e, t)), (t = !1));
  var i = ie;
  e: do
    try {
      if (W !== 0 && B !== null) {
        var s = B,
          f = He;
        switch (W) {
          case 8:
            (Os(), (i = 6));
            break e;
          case 3:
          case 2:
          case 6:
            Fe.current === null && (t = !0);
            var r = W;
            if (((W = 0), (He = null), Fl(e, s, f, r), l && _a)) {
              i = 0;
              break e;
            }
            break;
          default:
            ((r = W), (W = 0), (He = null), Fl(e, s, f, r));
        }
      }
      (Vm(), (i = ie));
      break;
    } catch (b) {
      ah(e, b);
    }
  while (!0);
  return (
    t && e.shellSuspendCounter++,
    (jt = Cl = null),
    (ne = a),
    (H.H = n),
    (H.A = u),
    B === null && ((F = null), (V = 0), ku()),
    i
  );
}
function Vm() {
  for (; B !== null; ) ch(B);
}
function Qm(e, t) {
  var l = ne;
  ne |= 2;
  var a = nh(),
    n = uh();
  F !== e || V !== t
    ? ((Ou = null), (Tu = rt() + 500), ma(e, t))
    : (_a = gn(e, t));
  e: do
    try {
      if (W !== 0 && B !== null) {
        t = B;
        var u = He;
        t: switch (W) {
          case 1:
            ((W = 0), (He = null), Fl(e, t, u, 1));
            break;
          case 2:
            if (gf(u)) {
              ((W = 0), (He = null), Qf(t));
              break;
            }
            ((t = function () {
              (W === 2 && F === e && (W = 7), mt(e));
            }),
              u.then(t, t));
            break e;
          case 3:
            W = 7;
            break e;
          case 4:
            W = 5;
            break e;
          case 7:
            gf(u)
              ? ((W = 0), (He = null), Qf(t))
              : ((W = 0), (He = null), Fl(e, t, u, 7));
            break;
          case 5:
            var i = null;
            switch (B.tag) {
              case 26:
                i = B.memoizedState;
              case 5:
              case 27:
                var s = B;
                if (!i || _h(i)) {
                  ((W = 0), (He = null));
                  var f = s.sibling;
                  if (f !== null) B = f;
                  else {
                    var r = s.return;
                    r !== null ? ((B = r), Pu(r)) : (B = null);
                  }
                  break t;
                }
            }
            ((W = 0), (He = null), Fl(e, t, u, 5));
            break;
          case 6:
            ((W = 0), (He = null), Fl(e, t, u, 6));
            break;
          case 8:
            (Os(), (ie = 6));
            break e;
          default:
            throw Error(p(462));
        }
      }
      Gm();
      break;
    } catch (b) {
      ah(e, b);
    }
  while (!0);
  return (
    (jt = Cl = null),
    (H.H = a),
    (H.A = n),
    (ne = l),
    B !== null ? 0 : ((F = null), (V = 0), ku(), ie)
  );
}
function Gm() {
  for (; B !== null && !o0(); ) ch(B);
}
function ch(e) {
  var t = zd(e.alternate, e, Ct);
  ((e.memoizedProps = e.pendingProps), t === null ? Pu(e) : (B = t));
}
function Qf(e) {
  var t = e,
    l = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = zf(l, t, t.pendingProps, t.type, void 0, V);
      break;
    case 11:
      t = zf(l, t, t.pendingProps, t.type.render, t.ref, V);
      break;
    case 5:
      ds(t);
    default:
      (eh(l, t), (t = B = Id(t, Ct)), (t = zd(l, t, Ct)));
  }
  ((e.memoizedProps = e.pendingProps), t === null ? Pu(e) : (B = t));
}
function Fl(e, t, l, a) {
  ((jt = Cl = null), ds(t), (la = null), (cn = 0));
  var n = t.return;
  try {
    if (Cm(e, n, t, l, V)) {
      ((ie = 1), Eu(e, Je(l, e.current)), (B = null));
      return;
    }
  } catch (u) {
    if (n !== null) throw ((B = n), u);
    ((ie = 1), Eu(e, Je(l, e.current)), (B = null));
    return;
  }
  t.flags & 32768
    ? (G || a === 1
        ? (e = !0)
        : _a || V & 536870912
          ? (e = !1)
          : ((_t = e = !0),
            (a === 2 || a === 3 || a === 6) &&
              ((a = Fe.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
      ih(t, e))
    : Pu(t);
}
function Pu(e) {
  var t = e;
  do {
    if (t.flags & 32768) {
      ih(t, _t);
      return;
    }
    e = t.return;
    var l = qm(t.alternate, t, Ct);
    if (l !== null) {
      B = l;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      B = t;
      return;
    }
    B = t = e;
  } while (t !== null);
  ie === 0 && (ie = 5);
}
function ih(e, t) {
  do {
    var l = Lm(e.alternate, e);
    if (l !== null) {
      ((l.flags &= 32767), (B = l));
      return;
    }
    if (
      ((l = e.return),
      l !== null &&
        ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
      !t && ((e = e.sibling), e !== null))
    ) {
      B = e;
      return;
    }
    B = e = l;
  } while (e !== null);
  ((ie = 6), (B = null));
}
function Gf(e, t, l, a, n, u, i, s, f, r) {
  var b = H.T,
    y = I.p;
  try {
    ((I.p = 2), (H.T = null), Xm(e, t, l, a, y, n, u, i, s, f, r));
  } finally {
    ((H.T = b), (I.p = y));
  }
}
function Xm(e, t, l, a, n, u, i, s) {
  do ca();
  while (ol !== null);
  if (ne & 6) throw Error(p(327));
  var f = e.finishedWork;
  if (((a = e.finishedLanes), f === null)) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), f === e.current))
    throw Error(p(177));
  ((e.callbackNode = null),
    (e.callbackPriority = 0),
    (e.cancelPendingCommit = null));
  var r = f.lanes | f.childLanes;
  if (
    ((r |= ts),
    A0(e, a, r, u, i, s),
    e === F && ((B = F = null), (V = 0)),
    (!(f.subtreeFlags & 10256) && !(f.flags & 10256)) ||
      Vn ||
      ((Vn = !0),
      (Ni = r),
      (ji = l),
      Jm(hu, function () {
        return (ca(), null);
      })),
    (l = (f.flags & 15990) !== 0),
    f.subtreeFlags & 15990 || l
      ? ((l = H.T),
        (H.T = null),
        (u = I.p),
        (I.p = 2),
        (i = ne),
        (ne |= 4),
        zm(e, f),
        Zd(f, e),
        mm(zi, e.containerInfo),
        (qu = !!Ri),
        (zi = Ri = null),
        (e.current = f),
        Vd(e, f.alternate, f),
        d0(),
        (ne = i),
        (I.p = u),
        (H.T = l))
      : (e.current = f),
    Vn ? ((Vn = !1), (ol = e), (Ia = a)) : sh(e, r),
    (r = e.pendingLanes),
    r === 0 && ($t = null),
    b0(f.stateNode),
    mt(e),
    t !== null)
  )
    for (n = e.onRecoverableError, f = 0; f < t.length; f++)
      ((r = t[f]), n(r.value, { componentStack: r.stack }));
  return (
    Ia & 3 && ca(),
    (r = e.pendingLanes),
    a & 4194218 && r & 42 ? (e === Ti ? Pa++ : ((Pa = 0), (Ti = e))) : (Pa = 0),
    jn(0),
    null
  );
}
function sh(e, t) {
  (e.pooledCacheLanes &= t) === 0 &&
    ((t = e.pooledCache), t != null && ((e.pooledCache = null), An(t)));
}
function ca() {
  if (ol !== null) {
    var e = ol,
      t = Ni;
    Ni = 0;
    var l = ro(Ia),
      a = H.T,
      n = I.p;
    try {
      if (((I.p = 32 > l ? 32 : l), (H.T = null), ol === null)) var u = !1;
      else {
        ((l = ji), (ji = null));
        var i = ol,
          s = Ia;
        if (((ol = null), (Ia = 0), ne & 6)) throw Error(p(331));
        var f = ne;
        if (
          ((ne |= 4),
          Wd(i.current),
          Kd(i, i.current, s, l),
          (ne = f),
          jn(0, !1),
          Le && typeof Le.onPostCommitFiberRoot == "function")
        )
          try {
            Le.onPostCommitFiberRoot(bn, i);
          } catch {}
        u = !0;
      }
      return u;
    } finally {
      ((I.p = n), (H.T = a), sh(e, t));
    }
  }
  return !1;
}
function Xf(e, t, l) {
  ((t = Je(l, t)),
    (t = mi(e.stateNode, t, 2)),
    (e = Kt(e, t, 2)),
    e !== null && (pn(e, 2), mt(e)));
}
function J(e, t, l) {
  if (e.tag === 3) Xf(e, e, l);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Xf(t, e, l);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof a.componentDidCatch == "function" &&
            ($t === null || !$t.has(a)))
        ) {
          ((e = Je(l, e)),
            (l = jd(2)),
            (a = Kt(t, l, 2)),
            a !== null && (Td(l, a, t, e), pn(a, 2), mt(a)));
          break;
        }
      }
      t = t.return;
    }
}
function Mc(e, t, l) {
  var a = e.pingCache;
  if (a === null) {
    a = e.pingCache = new Ym();
    var n = new Set();
    a.set(t, n);
  } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)));
  n.has(l) || ((Ns = !0), n.add(l), (e = Zm.bind(null, e, t, l)), t.then(e, e));
}
function Zm(e, t, l) {
  var a = e.pingCache;
  (a !== null && a.delete(t),
    (e.pingedLanes |= e.suspendedLanes & l),
    (e.warmLanes &= ~l),
    F === e &&
      (V & l) === l &&
      (ie === 4 || (ie === 3 && (V & 62914560) === V && 300 > rt() - Ts)
        ? !(ne & 2) && ma(e, 0)
        : (js |= l),
      ha === V && (ha = 0)),
    mt(e));
}
function fh(e, t) {
  (t === 0 && (t = io()), (e = el(e, t)), e !== null && (pn(e, t), mt(e)));
}
function km(e) {
  var t = e.memoizedState,
    l = 0;
  (t !== null && (l = t.retryLane), fh(e, l));
}
function Km(e, t) {
  var l = 0;
  switch (e.tag) {
    case 13:
      var a = e.stateNode,
        n = e.memoizedState;
      n !== null && (l = n.retryLane);
      break;
    case 19:
      a = e.stateNode;
      break;
    case 22:
      a = e.stateNode._retryCache;
      break;
    default:
      throw Error(p(314));
  }
  (a !== null && a.delete(t), fh(e, l));
}
function Jm(e, t) {
  return Ki(e, t);
}
var Mu = null,
  wl = null,
  Di = !1,
  Du = !1,
  Dc = !1,
  _l = 0;
function mt(e) {
  (e !== wl &&
    e.next === null &&
    (wl === null ? (Mu = wl = e) : (wl = wl.next = e)),
    (Du = !0),
    Di || ((Di = !0), Wm($m)));
}
function jn(e, t) {
  if (!Dc && Du) {
    Dc = !0;
    do
      for (var l = !1, a = Mu; a !== null; ) {
        if (e !== 0) {
          var n = a.pendingLanes;
          if (n === 0) var u = 0;
          else {
            var i = a.suspendedLanes,
              s = a.pingedLanes;
            ((u = (1 << (31 - Be(42 | e) + 1)) - 1),
              (u &= n & ~(i & ~s)),
              (u = u & 201326677 ? (u & 201326677) | 1 : u ? u | 2 : 0));
          }
          u !== 0 && ((l = !0), Zf(a, u));
        } else
          ((u = V),
            (u = Qu(a, a === F ? u : 0)),
            !(u & 3) || gn(a, u) || ((l = !0), Zf(a, u)));
        a = a.next;
      }
    while (l);
    Dc = !1;
  }
}
function $m() {
  Du = Di = !1;
  var e = 0;
  _l !== 0 && (nv() && (e = _l), (_l = 0));
  for (var t = rt(), l = null, a = Mu; a !== null; ) {
    var n = a.next,
      u = rh(a, t);
    (u === 0
      ? ((a.next = null),
        l === null ? (Mu = n) : (l.next = n),
        n === null && (wl = l))
      : ((l = a), (e !== 0 || u & 3) && (Du = !0)),
      (a = n));
  }
  jn(e);
}
function rh(e, t) {
  for (
    var l = e.suspendedLanes,
      a = e.pingedLanes,
      n = e.expirationTimes,
      u = e.pendingLanes & -62914561;
    0 < u;
  ) {
    var i = 31 - Be(u),
      s = 1 << i,
      f = n[i];
    (f === -1
      ? (!(s & l) || s & a) && (n[i] = S0(s, t))
      : f <= t && (e.expiredLanes |= s),
      (u &= ~s));
  }
  if (
    ((t = F),
    (l = V),
    (l = Qu(e, e === t ? l : 0)),
    (a = e.callbackNode),
    l === 0 || (e === t && W === 2) || e.cancelPendingCommit !== null)
  )
    return (
      a !== null && a !== null && cc(a),
      (e.callbackNode = null),
      (e.callbackPriority = 0)
    );
  if (!(l & 3) || gn(e, l)) {
    if (((t = l & -l), t === e.callbackPriority)) return t;
    switch ((a !== null && cc(a), ro(l))) {
      case 2:
      case 8:
        l = no;
        break;
      case 32:
        l = hu;
        break;
      case 268435456:
        l = uo;
        break;
      default:
        l = hu;
    }
    return (
      (a = oh.bind(null, e)),
      (l = Ki(l, a)),
      (e.callbackPriority = t),
      (e.callbackNode = l),
      t
    );
  }
  return (
    a !== null && a !== null && cc(a),
    (e.callbackPriority = 2),
    (e.callbackNode = null),
    2
  );
}
function oh(e, t) {
  var l = e.callbackNode;
  if (ca() && e.callbackNode !== l) return null;
  var a = V;
  return (
    (a = Qu(e, e === F ? a : 0)),
    a === 0
      ? null
      : (lh(e, a, t),
        rh(e, rt()),
        e.callbackNode != null && e.callbackNode === l
          ? oh.bind(null, e)
          : null)
  );
}
function Zf(e, t) {
  if (ca()) return null;
  lh(e, t, !0);
}
function Wm(e) {
  cv(function () {
    ne & 6 ? Ki(ao, e) : e();
  });
}
function Ms() {
  return (_l === 0 && (_l = co()), _l);
}
function kf(e) {
  return e == null || typeof e == "symbol" || typeof e == "boolean"
    ? null
    : typeof e == "function"
      ? e
      : Fn("" + e);
}
function Kf(e, t) {
  var l = t.ownerDocument.createElement("input");
  return (
    (l.name = t.name),
    (l.value = t.value),
    e.id && l.setAttribute("form", e.id),
    t.parentNode.insertBefore(l, t),
    (e = new FormData(e)),
    l.parentNode.removeChild(l),
    e
  );
}
function Fm(e, t, l, a, n) {
  if (t === "submit" && l && l.stateNode === n) {
    var u = kf((n[Re] || null).action),
      i = a.submitter;
    i &&
      ((t = (t = i[Re] || null)
        ? kf(t.formAction)
        : i.getAttribute("formAction")),
      t !== null && ((u = t), (i = null)));
    var s = new Gu("action", "action", null, a, n);
    e.push({
      event: s,
      listeners: [
        {
          instance: null,
          listener: function () {
            if (a.defaultPrevented) {
              if (_l !== 0) {
                var f = i ? Kf(n, i) : new FormData(n);
                di(
                  l,
                  { pending: !0, data: f, method: n.method, action: u },
                  null,
                  f,
                );
              }
            } else
              typeof u == "function" &&
                (s.preventDefault(),
                (f = i ? Kf(n, i) : new FormData(n)),
                di(
                  l,
                  { pending: !0, data: f, method: n.method, action: u },
                  u,
                  f,
                ));
          },
          currentTarget: n,
        },
      ],
    });
  }
}
for (var Cc = 0; Cc < mf.length; Cc++) {
  var Rc = mf[Cc],
    Im = Rc.toLowerCase(),
    Pm = Rc[0].toUpperCase() + Rc.slice(1);
  ut(Im, "on" + Pm);
}
ut(Ro, "onAnimationEnd");
ut(zo, "onAnimationIteration");
ut(Uo, "onAnimationStart");
ut("dblclick", "onDoubleClick");
ut("focusin", "onFocus");
ut("focusout", "onBlur");
ut(ym, "onTransitionRun");
ut(bm, "onTransitionStart");
ut(gm, "onTransitionCancel");
ut(Ho, "onTransitionEnd");
sa("onMouseEnter", ["mouseout", "mouseover"]);
sa("onMouseLeave", ["mouseout", "mouseover"]);
sa("onPointerEnter", ["pointerout", "pointerover"]);
sa("onPointerLeave", ["pointerout", "pointerover"]);
jl(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
jl(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
jl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
jl(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
jl(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
jl(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var fn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  ev = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle"
      .split(" ")
      .concat(fn),
  );
function dh(e, t) {
  t = (t & 4) !== 0;
  for (var l = 0; l < e.length; l++) {
    var a = e[l],
      n = a.event;
    a = a.listeners;
    e: {
      var u = void 0;
      if (t)
        for (var i = a.length - 1; 0 <= i; i--) {
          var s = a[i],
            f = s.instance,
            r = s.currentTarget;
          if (((s = s.listener), f !== u && n.isPropagationStopped())) break e;
          ((u = s), (n.currentTarget = r));
          try {
            u(n);
          } catch (b) {
            xu(b);
          }
          ((n.currentTarget = null), (u = f));
        }
      else
        for (i = 0; i < a.length; i++) {
          if (
            ((s = a[i]),
            (f = s.instance),
            (r = s.currentTarget),
            (s = s.listener),
            f !== u && n.isPropagationStopped())
          )
            break e;
          ((u = s), (n.currentTarget = r));
          try {
            u(n);
          } catch (b) {
            xu(b);
          }
          ((n.currentTarget = null), (u = f));
        }
    }
  }
}
function w(e, t) {
  var l = t[Pc];
  l === void 0 && (l = t[Pc] = new Set());
  var a = e + "__bubble";
  l.has(a) || (hh(t, e, 2, !1), l.add(a));
}
function zc(e, t, l) {
  var a = 0;
  (t && (a |= 4), hh(l, e, a, t));
}
var Qn = "_reactListening" + Math.random().toString(36).slice(2);
function Ds(e) {
  if (!e[Qn]) {
    ((e[Qn] = !0),
      ho.forEach(function (l) {
        l !== "selectionchange" && (ev.has(l) || zc(l, !1, e), zc(l, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Qn] || ((t[Qn] = !0), zc("selectionchange", !1, t));
  }
}
function hh(e, t, l, a) {
  switch (Nh(t)) {
    case 2:
      var n = jv;
      break;
    case 8:
      n = Tv;
      break;
    default:
      n = Us;
  }
  ((l = n.bind(null, t, l, e)),
    (n = void 0),
    !ai ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (n = !0),
    a
      ? n !== void 0
        ? e.addEventListener(t, l, { capture: !0, passive: n })
        : e.addEventListener(t, l, !0)
      : n !== void 0
        ? e.addEventListener(t, l, { passive: n })
        : e.addEventListener(t, l, !1));
}
function Uc(e, t, l, a, n) {
  var u = a;
  if (!(t & 1) && !(t & 2) && a !== null)
    e: for (;;) {
      if (a === null) return;
      var i = a.tag;
      if (i === 3 || i === 4) {
        var s = a.stateNode.containerInfo;
        if (s === n || (s.nodeType === 8 && s.parentNode === n)) break;
        if (i === 4)
          for (i = a.return; i !== null; ) {
            var f = i.tag;
            if (
              (f === 3 || f === 4) &&
              ((f = i.stateNode.containerInfo),
              f === n || (f.nodeType === 8 && f.parentNode === n))
            )
              return;
            i = i.return;
          }
        for (; s !== null; ) {
          if (((i = hl(s)), i === null)) return;
          if (((f = i.tag), f === 5 || f === 6 || f === 26 || f === 27)) {
            a = u = i;
            continue e;
          }
          s = s.parentNode;
        }
      }
      a = a.return;
    }
  So(function () {
    var r = u,
      b = Wi(l),
      y = [];
    e: {
      var h = qo.get(e);
      if (h !== void 0) {
        var m = Gu,
          A = e;
        switch (e) {
          case "keypress":
            if (Pn(l) === 0) break e;
          case "keydown":
          case "keyup":
            m = K0;
            break;
          case "focusin":
            ((A = "focus"), (m = oc));
            break;
          case "focusout":
            ((A = "blur"), (m = oc));
            break;
          case "beforeblur":
          case "afterblur":
            m = oc;
            break;
          case "click":
            if (l.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = tf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = H0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = W0;
            break;
          case Ro:
          case zo:
          case Uo:
            m = B0;
            break;
          case Ho:
            m = I0;
            break;
          case "scroll":
          case "scrollend":
            m = z0;
            break;
          case "wheel":
            m = em;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = w0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = af;
            break;
          case "toggle":
          case "beforetoggle":
            m = lm;
        }
        var N = (t & 4) !== 0,
          R = !N && (e === "scroll" || e === "scrollend"),
          o = N ? (h !== null ? h + "Capture" : null) : h;
        N = [];
        for (var d = r, v; d !== null; ) {
          var g = d;
          if (
            ((v = g.stateNode),
            (g = g.tag),
            (g !== 5 && g !== 26 && g !== 27) ||
              v === null ||
              o === null ||
              ((g = ln(d, o)), g != null && N.push(rn(d, g, v))),
            R)
          )
            break;
          d = d.return;
        }
        0 < N.length &&
          ((h = new m(h, A, null, l, b)), y.push({ event: h, listeners: N }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (m = e === "mouseout" || e === "pointerout"),
          h &&
            l !== li &&
            (A = l.relatedTarget || l.fromElement) &&
            (hl(A) || A[ga]))
        )
          break e;
        if (
          (m || h) &&
          ((h =
            b.window === b
              ? b
              : (h = b.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          m
            ? ((A = l.relatedTarget || l.toElement),
              (m = r),
              (A = A ? hl(A) : null),
              A !== null &&
                ((R = ba(A)),
                (N = A.tag),
                A !== R || (N !== 5 && N !== 27 && N !== 6)) &&
                (A = null))
            : ((m = null), (A = r)),
          m !== A)
        ) {
          if (
            ((N = tf),
            (g = "onMouseLeave"),
            (o = "onMouseEnter"),
            (d = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((N = af),
              (g = "onPointerLeave"),
              (o = "onPointerEnter"),
              (d = "pointer")),
            (R = m == null ? h : Ha(m)),
            (v = A == null ? h : Ha(A)),
            (h = new N(g, d + "leave", m, l, b)),
            (h.target = R),
            (h.relatedTarget = v),
            (g = null),
            hl(b) === r &&
              ((N = new N(o, d + "enter", A, l, b)),
              (N.target = v),
              (N.relatedTarget = R),
              (g = N)),
            (R = g),
            m && A)
          )
            t: {
              for (N = m, o = A, d = 0, v = N; v; v = zl(v)) d++;
              for (v = 0, g = o; g; g = zl(g)) v++;
              for (; 0 < d - v; ) ((N = zl(N)), d--);
              for (; 0 < v - d; ) ((o = zl(o)), v--);
              for (; d--; ) {
                if (N === o || (o !== null && N === o.alternate)) break t;
                ((N = zl(N)), (o = zl(o)));
              }
              N = null;
            }
          else N = null;
          (m !== null && Jf(y, h, m, N, !1),
            A !== null && R !== null && Jf(y, R, A, N, !0));
        }
      }
      e: {
        if (
          ((h = r ? Ha(r) : window),
          (m = h.nodeName && h.nodeName.toLowerCase()),
          m === "select" || (m === "input" && h.type === "file"))
        )
          var E = sf;
        else if (cf(h))
          if (To) E = dm;
          else {
            E = rm;
            var C = fm;
          }
        else
          ((m = h.nodeName),
            !m ||
            m.toLowerCase() !== "input" ||
            (h.type !== "checkbox" && h.type !== "radio")
              ? r && $i(r.elementType) && (E = sf)
              : (E = om));
        if (E && (E = E(e, r))) {
          jo(y, E, l, b);
          break e;
        }
        (C && C(e, h, r),
          e === "focusout" &&
            r &&
            h.type === "number" &&
            r.memoizedProps.value != null &&
            ti(h, "number", h.value));
      }
      switch (((C = r ? Ha(r) : window), e)) {
        case "focusin":
          (cf(C) || C.contentEditable === "true") &&
            ((Zl = C), (ni = r), (Va = null));
          break;
        case "focusout":
          Va = ni = Zl = null;
          break;
        case "mousedown":
          ui = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((ui = !1), hf(y, l, b));
          break;
        case "selectionchange":
          if (vm) break;
        case "keydown":
        case "keyup":
          hf(y, l, b);
      }
      var T;
      if (Pi)
        e: {
          switch (e) {
            case "compositionstart":
              var D = "onCompositionStart";
              break e;
            case "compositionend":
              D = "onCompositionEnd";
              break e;
            case "compositionupdate":
              D = "onCompositionUpdate";
              break e;
          }
          D = void 0;
        }
      else
        Xl
          ? Eo(e, l) && (D = "onCompositionEnd")
          : e === "keydown" && l.keyCode === 229 && (D = "onCompositionStart");
      (D &&
        (xo &&
          l.locale !== "ko" &&
          (Xl || D !== "onCompositionStart"
            ? D === "onCompositionEnd" && Xl && (T = Ao())
            : ((Xt = b),
              (Fi = "value" in Xt ? Xt.value : Xt.textContent),
              (Xl = !0))),
        (C = Cu(r, D)),
        0 < C.length &&
          ((D = new lf(D, e, null, l, b)),
          y.push({ event: D, listeners: C }),
          T ? (D.data = T) : ((T = No(l)), T !== null && (D.data = T)))),
        (T = nm ? um(e, l) : cm(e, l)) &&
          ((D = Cu(r, "onBeforeInput")),
          0 < D.length &&
            ((C = new lf("onBeforeInput", "beforeinput", null, l, b)),
            y.push({ event: C, listeners: D }),
            (C.data = T))),
        Fm(y, e, r, l, b));
    }
    dh(y, t);
  });
}
function rn(e, t, l) {
  return { instance: e, listener: t, currentTarget: l };
}
function Cu(e, t) {
  for (var l = t + "Capture", a = []; e !== null; ) {
    var n = e,
      u = n.stateNode;
    ((n = n.tag),
      (n !== 5 && n !== 26 && n !== 27) ||
        u === null ||
        ((n = ln(e, l)),
        n != null && a.unshift(rn(e, n, u)),
        (n = ln(e, t)),
        n != null && a.push(rn(e, n, u))),
      (e = e.return));
  }
  return a;
}
function zl(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5 && e.tag !== 27);
  return e || null;
}
function Jf(e, t, l, a, n) {
  for (var u = t._reactName, i = []; l !== null && l !== a; ) {
    var s = l,
      f = s.alternate,
      r = s.stateNode;
    if (((s = s.tag), f !== null && f === a)) break;
    ((s !== 5 && s !== 26 && s !== 27) ||
      r === null ||
      ((f = r),
      n
        ? ((r = ln(l, u)), r != null && i.unshift(rn(l, r, f)))
        : n || ((r = ln(l, u)), r != null && i.push(rn(l, r, f)))),
      (l = l.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var tv = /\r\n?/g,
  lv = /\u0000|\uFFFD/g;
function $f(e) {
  return (typeof e == "string" ? e : "" + e).replace(tv, ``).replace(lv, "");
}
function mh(e, t) {
  return ((t = $f(t)), $f(e) === t);
}
function ec() {}
function k(e, t, l, a, n, u) {
  switch (l) {
    case "children":
      typeof a == "string"
        ? t === "body" || (t === "textarea" && a === "") || fa(e, a)
        : (typeof a == "number" || typeof a == "bigint") &&
          t !== "body" &&
          fa(e, "" + a);
      break;
    case "className":
      Un(e, "class", a);
      break;
    case "tabIndex":
      Un(e, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      Un(e, l, a);
      break;
    case "style":
      _o(e, a, u);
      break;
    case "data":
      if (t !== "object") {
        Un(e, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (t !== "a" || l !== "href")) {
        e.removeAttribute(l);
        break;
      }
      if (
        a == null ||
        typeof a == "function" ||
        typeof a == "symbol" ||
        typeof a == "boolean"
      ) {
        e.removeAttribute(l);
        break;
      }
      ((a = Fn("" + a)), e.setAttribute(l, a));
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        e.setAttribute(
          l,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
        );
        break;
      } else
        typeof u == "function" &&
          (l === "formAction"
            ? (t !== "input" && k(e, t, "name", n.name, n, null),
              k(e, t, "formEncType", n.formEncType, n, null),
              k(e, t, "formMethod", n.formMethod, n, null),
              k(e, t, "formTarget", n.formTarget, n, null))
            : (k(e, t, "encType", n.encType, n, null),
              k(e, t, "method", n.method, n, null),
              k(e, t, "target", n.target, n, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        e.removeAttribute(l);
        break;
      }
      ((a = Fn("" + a)), e.setAttribute(l, a));
      break;
    case "onClick":
      a != null && (e.onclick = ec);
      break;
    case "onScroll":
      a != null && w("scroll", e);
      break;
    case "onScrollEnd":
      a != null && w("scrollend", e);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(p(61));
        if (((l = a.__html), l != null)) {
          if (n.children != null) throw Error(p(60));
          e.innerHTML = l;
        }
      }
      break;
    case "multiple":
      e.multiple = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "muted":
      e.muted = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (
        a == null ||
        typeof a == "function" ||
        typeof a == "boolean" ||
        typeof a == "symbol"
      ) {
        e.removeAttribute("xlink:href");
        break;
      }
      ((l = Fn("" + a)),
        e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol"
        ? e.setAttribute(l, "" + a)
        : e.removeAttribute(l);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      a && typeof a != "function" && typeof a != "symbol"
        ? e.setAttribute(l, "")
        : e.removeAttribute(l);
      break;
    case "capture":
    case "download":
      a === !0
        ? e.setAttribute(l, "")
        : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null &&
      typeof a != "function" &&
      typeof a != "symbol" &&
      !isNaN(a) &&
      1 <= a
        ? e.setAttribute(l, a)
        : e.removeAttribute(l);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
        ? e.removeAttribute(l)
        : e.setAttribute(l, a);
      break;
    case "popover":
      (w("beforetoggle", e), w("toggle", e), Wn(e, "popover", a));
      break;
    case "xlinkActuate":
      vt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
      break;
    case "xlinkArcrole":
      vt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
      break;
    case "xlinkRole":
      vt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
      break;
    case "xlinkShow":
      vt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
      break;
    case "xlinkTitle":
      vt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
      break;
    case "xlinkType":
      vt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
      break;
    case "xmlBase":
      vt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
      break;
    case "xmlLang":
      vt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
      break;
    case "xmlSpace":
      vt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
      break;
    case "is":
      Wn(e, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < l.length) ||
        (l[0] !== "o" && l[0] !== "O") ||
        (l[1] !== "n" && l[1] !== "N")) &&
        ((l = C0.get(l) || l), Wn(e, l, a));
  }
}
function Ci(e, t, l, a, n, u) {
  switch (l) {
    case "style":
      _o(e, a, u);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(p(61));
        if (((l = a.__html), l != null)) {
          if (n.children != null) throw Error(p(60));
          e.innerHTML = l;
        }
      }
      break;
    case "children":
      typeof a == "string"
        ? fa(e, a)
        : (typeof a == "number" || typeof a == "bigint") && fa(e, "" + a);
      break;
    case "onScroll":
      a != null && w("scroll", e);
      break;
    case "onScrollEnd":
      a != null && w("scrollend", e);
      break;
    case "onClick":
      a != null && (e.onclick = ec);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!mo.hasOwnProperty(l))
        e: {
          if (
            l[0] === "o" &&
            l[1] === "n" &&
            ((n = l.endsWith("Capture")),
            (t = l.slice(2, n ? l.length - 7 : void 0)),
            (u = e[Re] || null),
            (u = u != null ? u[l] : null),
            typeof u == "function" && e.removeEventListener(t, u, n),
            typeof a == "function")
          ) {
            (typeof u != "function" &&
              u !== null &&
              (l in e
                ? (e[l] = null)
                : e.hasAttribute(l) && e.removeAttribute(l)),
              e.addEventListener(t, a, n));
            break e;
          }
          l in e ? (e[l] = a) : a === !0 ? e.setAttribute(l, "") : Wn(e, l, a);
        }
  }
}
function Ae(e, t, l) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      (w("error", e), w("load", e));
      var a = !1,
        n = !1,
        u;
      for (u in l)
        if (l.hasOwnProperty(u)) {
          var i = l[u];
          if (i != null)
            switch (u) {
              case "src":
                a = !0;
                break;
              case "srcSet":
                n = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(p(137, t));
              default:
                k(e, t, u, i, l, null);
            }
        }
      (n && k(e, t, "srcSet", l.srcSet, l, null),
        a && k(e, t, "src", l.src, l, null));
      return;
    case "input":
      w("invalid", e);
      var s = (u = i = n = null),
        f = null,
        r = null;
      for (a in l)
        if (l.hasOwnProperty(a)) {
          var b = l[a];
          if (b != null)
            switch (a) {
              case "name":
                n = b;
                break;
              case "type":
                i = b;
                break;
              case "checked":
                f = b;
                break;
              case "defaultChecked":
                r = b;
                break;
              case "value":
                u = b;
                break;
              case "defaultValue":
                s = b;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(p(137, t));
                break;
              default:
                k(e, t, a, b, l, null);
            }
        }
      (bo(e, u, s, f, r, i, n, !1), mu(e));
      return;
    case "select":
      (w("invalid", e), (a = i = u = null));
      for (n in l)
        if (l.hasOwnProperty(n) && ((s = l[n]), s != null))
          switch (n) {
            case "value":
              u = s;
              break;
            case "defaultValue":
              i = s;
              break;
            case "multiple":
              a = s;
            default:
              k(e, t, n, s, l, null);
          }
      ((t = u),
        (l = i),
        (e.multiple = !!a),
        t != null ? ea(e, !!a, t, !1) : l != null && ea(e, !!a, l, !0));
      return;
    case "textarea":
      (w("invalid", e), (u = n = a = null));
      for (i in l)
        if (l.hasOwnProperty(i) && ((s = l[i]), s != null))
          switch (i) {
            case "value":
              a = s;
              break;
            case "defaultValue":
              n = s;
              break;
            case "children":
              u = s;
              break;
            case "dangerouslySetInnerHTML":
              if (s != null) throw Error(p(91));
              break;
            default:
              k(e, t, i, s, l, null);
          }
      (po(e, a, n, u), mu(e));
      return;
    case "option":
      for (f in l)
        if (l.hasOwnProperty(f) && ((a = l[f]), a != null))
          switch (f) {
            case "selected":
              e.selected = a && typeof a != "function" && typeof a != "symbol";
              break;
            default:
              k(e, t, f, a, l, null);
          }
      return;
    case "dialog":
      (w("cancel", e), w("close", e));
      break;
    case "iframe":
    case "object":
      w("load", e);
      break;
    case "video":
    case "audio":
      for (a = 0; a < fn.length; a++) w(fn[a], e);
      break;
    case "image":
      (w("error", e), w("load", e));
      break;
    case "details":
      w("toggle", e);
      break;
    case "embed":
    case "source":
    case "link":
      (w("error", e), w("load", e));
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (r in l)
        if (l.hasOwnProperty(r) && ((a = l[r]), a != null))
          switch (r) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(p(137, t));
            default:
              k(e, t, r, a, l, null);
          }
      return;
    default:
      if ($i(t)) {
        for (b in l)
          l.hasOwnProperty(b) &&
            ((a = l[b]), a !== void 0 && Ci(e, t, b, a, l, void 0));
        return;
      }
  }
  for (s in l)
    l.hasOwnProperty(s) && ((a = l[s]), a != null && k(e, t, s, a, l, null));
}
function av(e, t, l, a) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var n = null,
        u = null,
        i = null,
        s = null,
        f = null,
        r = null,
        b = null;
      for (m in l) {
        var y = l[m];
        if (l.hasOwnProperty(m) && y != null)
          switch (m) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              f = y;
            default:
              a.hasOwnProperty(m) || k(e, t, m, null, a, y);
          }
      }
      for (var h in a) {
        var m = a[h];
        if (((y = l[h]), a.hasOwnProperty(h) && (m != null || y != null)))
          switch (h) {
            case "type":
              u = m;
              break;
            case "name":
              n = m;
              break;
            case "checked":
              r = m;
              break;
            case "defaultChecked":
              b = m;
              break;
            case "value":
              i = m;
              break;
            case "defaultValue":
              s = m;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (m != null) throw Error(p(137, t));
              break;
            default:
              m !== y && k(e, t, h, m, a, y);
          }
      }
      ei(e, i, s, f, r, b, u, n);
      return;
    case "select":
      m = i = s = h = null;
      for (u in l)
        if (((f = l[u]), l.hasOwnProperty(u) && f != null))
          switch (u) {
            case "value":
              break;
            case "multiple":
              m = f;
            default:
              a.hasOwnProperty(u) || k(e, t, u, null, a, f);
          }
      for (n in a)
        if (
          ((u = a[n]),
          (f = l[n]),
          a.hasOwnProperty(n) && (u != null || f != null))
        )
          switch (n) {
            case "value":
              h = u;
              break;
            case "defaultValue":
              s = u;
              break;
            case "multiple":
              i = u;
            default:
              u !== f && k(e, t, n, u, a, f);
          }
      ((t = s),
        (l = i),
        (a = m),
        h != null
          ? ea(e, !!l, h, !1)
          : !!a != !!l &&
            (t != null ? ea(e, !!l, t, !0) : ea(e, !!l, l ? [] : "", !1)));
      return;
    case "textarea":
      m = h = null;
      for (s in l)
        if (
          ((n = l[s]), l.hasOwnProperty(s) && n != null && !a.hasOwnProperty(s))
        )
          switch (s) {
            case "value":
              break;
            case "children":
              break;
            default:
              k(e, t, s, null, a, n);
          }
      for (i in a)
        if (
          ((n = a[i]),
          (u = l[i]),
          a.hasOwnProperty(i) && (n != null || u != null))
        )
          switch (i) {
            case "value":
              h = n;
              break;
            case "defaultValue":
              m = n;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (n != null) throw Error(p(91));
              break;
            default:
              n !== u && k(e, t, i, n, a, u);
          }
      go(e, h, m);
      return;
    case "option":
      for (var A in l)
        if (
          ((h = l[A]), l.hasOwnProperty(A) && h != null && !a.hasOwnProperty(A))
        )
          switch (A) {
            case "selected":
              e.selected = !1;
              break;
            default:
              k(e, t, A, null, a, h);
          }
      for (f in a)
        if (
          ((h = a[f]),
          (m = l[f]),
          a.hasOwnProperty(f) && h !== m && (h != null || m != null))
        )
          switch (f) {
            case "selected":
              e.selected = h && typeof h != "function" && typeof h != "symbol";
              break;
            default:
              k(e, t, f, h, a, m);
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var N in l)
        ((h = l[N]),
          l.hasOwnProperty(N) &&
            h != null &&
            !a.hasOwnProperty(N) &&
            k(e, t, N, null, a, h));
      for (r in a)
        if (
          ((h = a[r]),
          (m = l[r]),
          a.hasOwnProperty(r) && h !== m && (h != null || m != null))
        )
          switch (r) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (h != null) throw Error(p(137, t));
              break;
            default:
              k(e, t, r, h, a, m);
          }
      return;
    default:
      if ($i(t)) {
        for (var R in l)
          ((h = l[R]),
            l.hasOwnProperty(R) &&
              h !== void 0 &&
              !a.hasOwnProperty(R) &&
              Ci(e, t, R, void 0, a, h));
        for (b in a)
          ((h = a[b]),
            (m = l[b]),
            !a.hasOwnProperty(b) ||
              h === m ||
              (h === void 0 && m === void 0) ||
              Ci(e, t, b, h, a, m));
        return;
      }
  }
  for (var o in l)
    ((h = l[o]),
      l.hasOwnProperty(o) &&
        h != null &&
        !a.hasOwnProperty(o) &&
        k(e, t, o, null, a, h));
  for (y in a)
    ((h = a[y]),
      (m = l[y]),
      !a.hasOwnProperty(y) ||
        h === m ||
        (h == null && m == null) ||
        k(e, t, y, h, a, m));
}
var Ri = null,
  zi = null;
function Ru(e) {
  return e.nodeType === 9 ? e : e.ownerDocument;
}
function Wf(e) {
  switch (e) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function vh(e, t) {
  if (e === 0)
    switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return e === 1 && t === "foreignObject" ? 0 : e;
}
function Ui(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    typeof t.children == "bigint" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Hc = null;
function nv() {
  var e = window.event;
  return e && e.type === "popstate"
    ? e === Hc
      ? !1
      : ((Hc = e), !0)
    : ((Hc = null), !1);
}
var yh = typeof setTimeout == "function" ? setTimeout : void 0,
  uv = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ff = typeof Promise == "function" ? Promise : void 0,
  cv =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ff < "u"
        ? function (e) {
            return Ff.resolve(null).then(e).catch(iv);
          }
        : yh;
function iv(e) {
  setTimeout(function () {
    throw e;
  });
}
function qc(e, t) {
  var l = t,
    a = 0;
  do {
    var n = l.nextSibling;
    if ((e.removeChild(l), n && n.nodeType === 8))
      if (((l = n.data), l === "/$")) {
        if (a === 0) {
          (e.removeChild(n), vn(t));
          return;
        }
        a--;
      } else (l !== "$" && l !== "$?" && l !== "$!") || a++;
    l = n;
  } while (l);
  vn(t);
}
function Hi(e) {
  var t = e.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var l = t;
    switch (((t = t.nextSibling), l.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        (Hi(l), Ji(l));
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (l.rel.toLowerCase() === "stylesheet") continue;
    }
    e.removeChild(l);
  }
}
function sv(e, t, l, a) {
  for (; e.nodeType === 1; ) {
    var n = l;
    if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
    } else if (a) {
      if (!e[tn])
        switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (
              ((u = e.getAttribute("rel")),
              u === "stylesheet" && e.hasAttribute("data-precedence"))
            )
              break;
            if (
              u !== n.rel ||
              e.getAttribute("href") !== (n.href == null ? null : n.href) ||
              e.getAttribute("crossorigin") !==
                (n.crossOrigin == null ? null : n.crossOrigin) ||
              e.getAttribute("title") !== (n.title == null ? null : n.title)
            )
              break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (
              ((u = e.getAttribute("src")),
              (u !== (n.src == null ? null : n.src) ||
                e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin)) &&
                u &&
                e.hasAttribute("async") &&
                !e.hasAttribute("itemprop"))
            )
              break;
            return e;
          default:
            return e;
        }
    } else if (t === "input" && e.type === "hidden") {
      var u = n.name == null ? null : "" + n.name;
      if (n.type === "hidden" && e.getAttribute("name") === u) return e;
    } else return e;
    if (((e = at(e.nextSibling)), e === null)) break;
  }
  return null;
}
function fv(e, t, l) {
  if (t === "") return null;
  for (; e.nodeType !== 3; )
    if (
      ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
        !l) ||
      ((e = at(e.nextSibling)), e === null)
    )
      return null;
  return e;
}
function at(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (
        ((t = e.data),
        t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
      )
        break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function If(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var l = e.data;
      if (l === "$" || l === "$!" || l === "$?") {
        if (t === 0) return e;
        t--;
      } else l === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
function bh(e, t, l) {
  switch (((t = Ru(l)), e)) {
    case "html":
      if (((e = t.documentElement), !e)) throw Error(p(452));
      return e;
    case "head":
      if (((e = t.head), !e)) throw Error(p(453));
      return e;
    case "body":
      if (((e = t.body), !e)) throw Error(p(454));
      return e;
    default:
      throw Error(p(451));
  }
}
var Ie = new Map(),
  Pf = new Set();
function zu(e) {
  return typeof e.getRootNode == "function" ? e.getRootNode() : e.ownerDocument;
}
var Rt = I.d;
I.d = { f: rv, r: ov, D: dv, C: hv, L: mv, m: vv, X: bv, S: yv, M: gv };
function rv() {
  var e = Rt.f(),
    t = Iu();
  return e || t;
}
function ov(e) {
  var t = pa(e);
  t !== null && t.tag === 5 && t.type === "form" ? bd(t) : Rt.r(e);
}
var Sa = typeof document > "u" ? null : document;
function gh(e, t, l) {
  var a = Sa;
  if (a && typeof t == "string" && t) {
    var n = Ke(t);
    ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
      typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
      Pf.has(n) ||
        (Pf.add(n),
        (e = { rel: e, crossOrigin: l, href: t }),
        a.querySelector(n) === null &&
          ((t = a.createElement("link")),
          Ae(t, "link", e),
          be(t),
          a.head.appendChild(t))));
  }
}
function dv(e) {
  (Rt.D(e), gh("dns-prefetch", e, null));
}
function hv(e, t) {
  (Rt.C(e, t), gh("preconnect", e, t));
}
function mv(e, t, l) {
  Rt.L(e, t, l);
  var a = Sa;
  if (a && e && t) {
    var n = 'link[rel="preload"][as="' + Ke(t) + '"]';
    t === "image" && l && l.imageSrcSet
      ? ((n += '[imagesrcset="' + Ke(l.imageSrcSet) + '"]'),
        typeof l.imageSizes == "string" &&
          (n += '[imagesizes="' + Ke(l.imageSizes) + '"]'))
      : (n += '[href="' + Ke(e) + '"]');
    var u = n;
    switch (t) {
      case "style":
        u = va(e);
        break;
      case "script":
        u = Aa(e);
    }
    Ie.has(u) ||
      ((e = P(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t,
        },
        l,
      )),
      Ie.set(u, e),
      a.querySelector(n) !== null ||
        (t === "style" && a.querySelector(Tn(u))) ||
        (t === "script" && a.querySelector(On(u))) ||
        ((t = a.createElement("link")),
        Ae(t, "link", e),
        be(t),
        a.head.appendChild(t)));
  }
}
function vv(e, t) {
  Rt.m(e, t);
  var l = Sa;
  if (l && e) {
    var a = t && typeof t.as == "string" ? t.as : "script",
      n = 'link[rel="modulepreload"][as="' + Ke(a) + '"][href="' + Ke(e) + '"]',
      u = n;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        u = Aa(e);
    }
    if (
      !Ie.has(u) &&
      ((e = P({ rel: "modulepreload", href: e }, t)),
      Ie.set(u, e),
      l.querySelector(n) === null)
    ) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (l.querySelector(On(u))) return;
      }
      ((a = l.createElement("link")),
        Ae(a, "link", e),
        be(a),
        l.head.appendChild(a));
    }
  }
}
function yv(e, t, l) {
  Rt.S(e, t, l);
  var a = Sa;
  if (a && e) {
    var n = Pl(a).hoistableStyles,
      u = va(e);
    t = t || "default";
    var i = n.get(u);
    if (!i) {
      var s = { loading: 0, preload: null };
      if ((i = a.querySelector(Tn(u)))) s.loading = 5;
      else {
        ((e = P({ rel: "stylesheet", href: e, "data-precedence": t }, l)),
          (l = Ie.get(u)) && Cs(e, l));
        var f = (i = a.createElement("link"));
        (be(f),
          Ae(f, "link", e),
          (f._p = new Promise(function (r, b) {
            ((f.onload = r), (f.onerror = b));
          })),
          f.addEventListener("load", function () {
            s.loading |= 1;
          }),
          f.addEventListener("error", function () {
            s.loading |= 2;
          }),
          (s.loading |= 4),
          uu(i, t, a));
      }
      ((i = { type: "stylesheet", instance: i, count: 1, state: s }),
        n.set(u, i));
    }
  }
}
function bv(e, t) {
  Rt.X(e, t);
  var l = Sa;
  if (l && e) {
    var a = Pl(l).hoistableScripts,
      n = Aa(e),
      u = a.get(n);
    u ||
      ((u = l.querySelector(On(n))),
      u ||
        ((e = P({ src: e, async: !0 }, t)),
        (t = Ie.get(n)) && Rs(e, t),
        (u = l.createElement("script")),
        be(u),
        Ae(u, "link", e),
        l.head.appendChild(u)),
      (u = { type: "script", instance: u, count: 1, state: null }),
      a.set(n, u));
  }
}
function gv(e, t) {
  Rt.M(e, t);
  var l = Sa;
  if (l && e) {
    var a = Pl(l).hoistableScripts,
      n = Aa(e),
      u = a.get(n);
    u ||
      ((u = l.querySelector(On(n))),
      u ||
        ((e = P({ src: e, async: !0, type: "module" }, t)),
        (t = Ie.get(n)) && Rs(e, t),
        (u = l.createElement("script")),
        be(u),
        Ae(u, "link", e),
        l.head.appendChild(u)),
      (u = { type: "script", instance: u, count: 1, state: null }),
      a.set(n, u));
  }
}
function er(e, t, l, a) {
  var n = (n = Zt.current) ? zu(n) : null;
  if (!n) throw Error(p(446));
  switch (e) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof l.precedence == "string" && typeof l.href == "string"
        ? ((t = va(l.href)),
          (l = Pl(n).hoistableStyles),
          (a = l.get(t)),
          a ||
            ((a = { type: "style", instance: null, count: 0, state: null }),
            l.set(t, a)),
          a)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (
        l.rel === "stylesheet" &&
        typeof l.href == "string" &&
        typeof l.precedence == "string"
      ) {
        e = va(l.href);
        var u = Pl(n).hoistableStyles,
          i = u.get(e);
        if (
          (i ||
            ((n = n.ownerDocument || n),
            (i = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            u.set(e, i),
            (u = n.querySelector(Tn(e))) &&
              !u._p &&
              ((i.instance = u), (i.state.loading = 5)),
            Ie.has(e) ||
              ((l = {
                rel: "preload",
                as: "style",
                href: l.href,
                crossOrigin: l.crossOrigin,
                integrity: l.integrity,
                media: l.media,
                hrefLang: l.hrefLang,
                referrerPolicy: l.referrerPolicy,
              }),
              Ie.set(e, l),
              u || pv(n, e, l, i.state))),
          t && a === null)
        )
          throw Error(p(528, ""));
        return i;
      }
      if (t && a !== null) throw Error(p(529, ""));
      return null;
    case "script":
      return (
        (t = l.async),
        (l = l.src),
        typeof l == "string" &&
        t &&
        typeof t != "function" &&
        typeof t != "symbol"
          ? ((t = Aa(l)),
            (l = Pl(n).hoistableScripts),
            (a = l.get(t)),
            a ||
              ((a = { type: "script", instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(p(444, e));
  }
}
function va(e) {
  return 'href="' + Ke(e) + '"';
}
function Tn(e) {
  return 'link[rel="stylesheet"][' + e + "]";
}
function ph(e) {
  return P({}, e, { "data-precedence": e.precedence, precedence: null });
}
function pv(e, t, l, a) {
  e.querySelector('link[rel="preload"][as="style"][' + t + "]")
    ? (a.loading = 1)
    : ((t = e.createElement("link")),
      (a.preload = t),
      t.addEventListener("load", function () {
        return (a.loading |= 1);
      }),
      t.addEventListener("error", function () {
        return (a.loading |= 2);
      }),
      Ae(t, "link", l),
      be(t),
      e.head.appendChild(t));
}
function Aa(e) {
  return '[src="' + Ke(e) + '"]';
}
function On(e) {
  return "script[async]" + e;
}
function tr(e, t, l) {
  if ((t.count++, t.instance === null))
    switch (t.type) {
      case "style":
        var a = e.querySelector('style[data-href~="' + Ke(l.href) + '"]');
        if (a) return ((t.instance = a), be(a), a);
        var n = P({}, l, {
          "data-href": l.href,
          "data-precedence": l.precedence,
          href: null,
          precedence: null,
        });
        return (
          (a = (e.ownerDocument || e).createElement("style")),
          be(a),
          Ae(a, "style", n),
          uu(a, l.precedence, e),
          (t.instance = a)
        );
      case "stylesheet":
        n = va(l.href);
        var u = e.querySelector(Tn(n));
        if (u) return ((t.state.loading |= 4), (t.instance = u), be(u), u);
        ((a = ph(l)),
          (n = Ie.get(n)) && Cs(a, n),
          (u = (e.ownerDocument || e).createElement("link")),
          be(u));
        var i = u;
        return (
          (i._p = new Promise(function (s, f) {
            ((i.onload = s), (i.onerror = f));
          })),
          Ae(u, "link", a),
          (t.state.loading |= 4),
          uu(u, l.precedence, e),
          (t.instance = u)
        );
      case "script":
        return (
          (u = Aa(l.src)),
          (n = e.querySelector(On(u)))
            ? ((t.instance = n), be(n), n)
            : ((a = l),
              (n = Ie.get(u)) && ((a = P({}, l)), Rs(a, n)),
              (e = e.ownerDocument || e),
              (n = e.createElement("script")),
              be(n),
              Ae(n, "link", a),
              e.head.appendChild(n),
              (t.instance = n))
        );
      case "void":
        return null;
      default:
        throw Error(p(443, t.type));
    }
  else
    t.type === "stylesheet" &&
      !(t.state.loading & 4) &&
      ((a = t.instance), (t.state.loading |= 4), uu(a, l.precedence, e));
  return t.instance;
}
function uu(e, t, l) {
  for (
    var a = l.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]',
      ),
      n = a.length ? a[a.length - 1] : null,
      u = n,
      i = 0;
    i < a.length;
    i++
  ) {
    var s = a[i];
    if (s.dataset.precedence === t) u = s;
    else if (u !== n) break;
  }
  u
    ? u.parentNode.insertBefore(e, u.nextSibling)
    : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
}
function Cs(e, t) {
  (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
    e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
    e.title == null && (e.title = t.title));
}
function Rs(e, t) {
  (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
    e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
    e.integrity == null && (e.integrity = t.integrity));
}
var cu = null;
function lr(e, t, l) {
  if (cu === null) {
    var a = new Map(),
      n = (cu = new Map());
    n.set(l, a);
  } else ((n = cu), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
  if (a.has(e)) return a;
  for (
    a.set(e, null), l = l.getElementsByTagName(e), n = 0;
    n < l.length;
    n++
  ) {
    var u = l[n];
    if (
      !(
        u[tn] ||
        u[Ee] ||
        (e === "link" && u.getAttribute("rel") === "stylesheet")
      ) &&
      u.namespaceURI !== "http://www.w3.org/2000/svg"
    ) {
      var i = u.getAttribute(t) || "";
      i = e + i;
      var s = a.get(i);
      s ? s.push(u) : a.set(i, [u]);
    }
  }
  return a;
}
function ar(e, t, l) {
  ((e = e.ownerDocument || e),
    e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null,
    ));
}
function _v(e, t, l) {
  if (l === 1 || t.itemProp != null) return !1;
  switch (e) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (
        typeof t.precedence != "string" ||
        typeof t.href != "string" ||
        t.href === ""
      )
        break;
      return !0;
    case "link":
      if (
        typeof t.rel != "string" ||
        typeof t.href != "string" ||
        t.href === "" ||
        t.onLoad ||
        t.onError
      )
        break;
      switch (t.rel) {
        case "stylesheet":
          return (
            (e = t.disabled),
            typeof t.precedence == "string" && e == null
          );
        default:
          return !0;
      }
    case "script":
      if (
        t.async &&
        typeof t.async != "function" &&
        typeof t.async != "symbol" &&
        !t.onLoad &&
        !t.onError &&
        t.src &&
        typeof t.src == "string"
      )
        return !0;
  }
  return !1;
}
function _h(e) {
  return !(e.type === "stylesheet" && !(e.state.loading & 3));
}
var on = null;
function Sv() {}
function Av(e, t, l) {
  if (on === null) throw Error(p(475));
  var a = on;
  if (
    t.type === "stylesheet" &&
    (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
    !(t.state.loading & 4)
  ) {
    if (t.instance === null) {
      var n = va(l.href),
        u = e.querySelector(Tn(n));
      if (u) {
        ((e = u._p),
          e !== null &&
            typeof e == "object" &&
            typeof e.then == "function" &&
            (a.count++, (a = Uu.bind(a)), e.then(a, a)),
          (t.state.loading |= 4),
          (t.instance = u),
          be(u));
        return;
      }
      ((u = e.ownerDocument || e),
        (l = ph(l)),
        (n = Ie.get(n)) && Cs(l, n),
        (u = u.createElement("link")),
        be(u));
      var i = u;
      ((i._p = new Promise(function (s, f) {
        ((i.onload = s), (i.onerror = f));
      })),
        Ae(u, "link", l),
        (t.instance = u));
    }
    (a.stylesheets === null && (a.stylesheets = new Map()),
      a.stylesheets.set(t, e),
      (e = t.state.preload) &&
        !(t.state.loading & 3) &&
        (a.count++,
        (t = Uu.bind(a)),
        e.addEventListener("load", t),
        e.addEventListener("error", t)));
  }
}
function xv() {
  if (on === null) throw Error(p(475));
  var e = on;
  return (
    e.stylesheets && e.count === 0 && qi(e, e.stylesheets),
    0 < e.count
      ? function (t) {
          var l = setTimeout(function () {
            if ((e.stylesheets && qi(e, e.stylesheets), e.unsuspend)) {
              var a = e.unsuspend;
              ((e.unsuspend = null), a());
            }
          }, 6e4);
          return (
            (e.unsuspend = t),
            function () {
              ((e.unsuspend = null), clearTimeout(l));
            }
          );
        }
      : null
  );
}
function Uu() {
  if ((this.count--, this.count === 0)) {
    if (this.stylesheets) qi(this, this.stylesheets);
    else if (this.unsuspend) {
      var e = this.unsuspend;
      ((this.unsuspend = null), e());
    }
  }
}
var Hu = null;
function qi(e, t) {
  ((e.stylesheets = null),
    e.unsuspend !== null &&
      (e.count++, (Hu = new Map()), t.forEach(Ev, e), (Hu = null), Uu.call(e)));
}
function Ev(e, t) {
  if (!(t.state.loading & 4)) {
    var l = Hu.get(e);
    if (l) var a = l.get(null);
    else {
      ((l = new Map()), Hu.set(e, l));
      for (
        var n = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]",
          ),
          u = 0;
        u < n.length;
        u++
      ) {
        var i = n[u];
        (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") &&
          (l.set(i.dataset.precedence, i), (a = i));
      }
      a && l.set(null, a);
    }
    ((n = t.instance),
      (i = n.getAttribute("data-precedence")),
      (u = l.get(i) || a),
      u === a && l.set(null, n),
      l.set(i, n),
      this.count++,
      (a = Uu.bind(this)),
      n.addEventListener("load", a),
      n.addEventListener("error", a),
      u
        ? u.parentNode.insertBefore(n, u.nextSibling)
        : ((e = e.nodeType === 9 ? e.head : e),
          e.insertBefore(n, e.firstChild)),
      (t.state.loading |= 4));
  }
}
var dn = {
  $$typeof: At,
  Provider: null,
  Consumer: null,
  _currentValue: vl,
  _currentValue2: vl,
  _threadCount: 0,
};
function Nv(e, t, l, a, n, u, i, s) {
  ((this.tag = 1),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = ic(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.finishedLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ic(0)),
    (this.hiddenUpdates = ic(null)),
    (this.identifierPrefix = a),
    (this.onUncaughtError = n),
    (this.onCaughtError = u),
    (this.onRecoverableError = i),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = s),
    (this.incompleteTransitions = new Map()));
}
function Sh(e, t, l, a, n, u, i, s, f, r, b, y) {
  return (
    (e = new Nv(e, t, l, i, s, f, r, y)),
    (t = 1),
    u === !0 && (t |= 24),
    (u = $e(3, null, null, t)),
    (e.current = u),
    (u.stateNode = e),
    (t = cs()),
    t.refCount++,
    (e.pooledCache = t),
    t.refCount++,
    (u.memoizedState = { element: a, isDehydrated: l, cache: t }),
    Ss(u),
    e
  );
}
function Ah(e) {
  return e ? ((e = Jl), e) : Jl;
}
function xh(e, t, l, a, n, u) {
  ((n = Ah(n)),
    a.context === null ? (a.context = n) : (a.pendingContext = n),
    (a = kt(t)),
    (a.payload = { element: l }),
    (u = u === void 0 ? null : u),
    u !== null && (a.callback = u),
    (l = Kt(e, a, t)),
    l !== null && (Oe(l, e, t), Ka(l, e, t)));
}
function nr(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var l = e.retryLane;
    e.retryLane = l !== 0 && l < t ? l : t;
  }
}
function zs(e, t) {
  (nr(e, t), (e = e.alternate) && nr(e, t));
}
function Eh(e) {
  if (e.tag === 13) {
    var t = el(e, 67108864);
    (t !== null && Oe(t, e, 67108864), zs(e, 67108864));
  }
}
var qu = !0;
function jv(e, t, l, a) {
  var n = H.T;
  H.T = null;
  var u = I.p;
  try {
    ((I.p = 2), Us(e, t, l, a));
  } finally {
    ((I.p = u), (H.T = n));
  }
}
function Tv(e, t, l, a) {
  var n = H.T;
  H.T = null;
  var u = I.p;
  try {
    ((I.p = 8), Us(e, t, l, a));
  } finally {
    ((I.p = u), (H.T = n));
  }
}
function Us(e, t, l, a) {
  if (qu) {
    var n = Li(a);
    if (n === null) (Uc(e, t, a, Lu, l), ur(e, a));
    else if (Mv(n, e, t, l, a)) a.stopPropagation();
    else if ((ur(e, a), t & 4 && -1 < Ov.indexOf(e))) {
      for (; n !== null; ) {
        var u = pa(n);
        if (u !== null)
          switch (u.tag) {
            case 3:
              if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                var i = fl(u.pendingLanes);
                if (i !== 0) {
                  var s = u;
                  for (s.pendingLanes |= 2, s.entangledLanes |= 2; i; ) {
                    var f = 1 << (31 - Be(i));
                    ((s.entanglements[1] |= f), (i &= ~f));
                  }
                  (mt(u), !(ne & 6) && ((Tu = rt() + 500), jn(0)));
                }
              }
              break;
            case 13:
              ((s = el(u, 2)), s !== null && Oe(s, u, 2), Iu(), zs(u, 2));
          }
        if (((u = Li(a)), u === null && Uc(e, t, a, Lu, l), u === n)) break;
        n = u;
      }
      n !== null && a.stopPropagation();
    } else Uc(e, t, a, null, l);
  }
}
function Li(e) {
  return ((e = Wi(e)), Hs(e));
}
var Lu = null;
function Hs(e) {
  if (((Lu = null), (e = hl(e)), e !== null)) {
    var t = ba(e);
    if (t === null) e = null;
    else {
      var l = t.tag;
      if (l === 13) {
        if (((e = to(t)), e !== null)) return e;
        e = null;
      } else if (l === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    }
  }
  return ((Lu = e), null);
}
function Nh(e) {
  switch (e) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (h0()) {
        case ao:
          return 2;
        case no:
          return 8;
        case hu:
        case m0:
          return 32;
        case uo:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var Bi = !1,
  Wt = null,
  Ft = null,
  It = null,
  hn = new Map(),
  mn = new Map(),
  Qt = [],
  Ov =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " ",
    );
function ur(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Wt = null;
      break;
    case "dragenter":
    case "dragleave":
      Ft = null;
      break;
    case "mouseover":
    case "mouseout":
      It = null;
      break;
    case "pointerover":
    case "pointerout":
      hn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      mn.delete(t.pointerId);
  }
}
function Da(e, t, l, a, n, u) {
  return e === null || e.nativeEvent !== u
    ? ((e = {
        blockedOn: t,
        domEventName: l,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [n],
      }),
      t !== null && ((t = pa(t)), t !== null && Eh(t)),
      e)
    : ((e.eventSystemFlags |= a),
      (t = e.targetContainers),
      n !== null && t.indexOf(n) === -1 && t.push(n),
      e);
}
function Mv(e, t, l, a, n) {
  switch (t) {
    case "focusin":
      return ((Wt = Da(Wt, e, t, l, a, n)), !0);
    case "dragenter":
      return ((Ft = Da(Ft, e, t, l, a, n)), !0);
    case "mouseover":
      return ((It = Da(It, e, t, l, a, n)), !0);
    case "pointerover":
      var u = n.pointerId;
      return (hn.set(u, Da(hn.get(u) || null, e, t, l, a, n)), !0);
    case "gotpointercapture":
      return (
        (u = n.pointerId),
        mn.set(u, Da(mn.get(u) || null, e, t, l, a, n)),
        !0
      );
  }
  return !1;
}
function jh(e) {
  var t = hl(e.target);
  if (t !== null) {
    var l = ba(t);
    if (l !== null) {
      if (((t = l.tag), t === 13)) {
        if (((t = to(l)), t !== null)) {
          ((e.blockedOn = t),
            x0(e.priority, function () {
              if (l.tag === 13) {
                var a = Ye(),
                  n = el(l, a);
                (n !== null && Oe(n, l, a), zs(l, a));
              }
            }));
          return;
        }
      } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function iu(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var l = Li(e.nativeEvent);
    if (l === null) {
      l = e.nativeEvent;
      var a = new l.constructor(l.type, l);
      ((li = a), l.target.dispatchEvent(a), (li = null));
    } else return ((t = pa(l)), t !== null && Eh(t), (e.blockedOn = l), !1);
    t.shift();
  }
  return !0;
}
function cr(e, t, l) {
  iu(e) && l.delete(t);
}
function Dv() {
  ((Bi = !1),
    Wt !== null && iu(Wt) && (Wt = null),
    Ft !== null && iu(Ft) && (Ft = null),
    It !== null && iu(It) && (It = null),
    hn.forEach(cr),
    mn.forEach(cr));
}
function Gn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Bi ||
      ((Bi = !0),
      ve.unstable_scheduleCallback(ve.unstable_NormalPriority, Dv)));
}
var Xn = null;
function ir(e) {
  Xn !== e &&
    ((Xn = e),
    ve.unstable_scheduleCallback(ve.unstable_NormalPriority, function () {
      Xn === e && (Xn = null);
      for (var t = 0; t < e.length; t += 3) {
        var l = e[t],
          a = e[t + 1],
          n = e[t + 2];
        if (typeof a != "function") {
          if (Hs(a || l) === null) continue;
          break;
        }
        var u = pa(l);
        u !== null &&
          (e.splice(t, 3),
          (t -= 3),
          di(u, { pending: !0, data: n, method: l.method, action: a }, a, n));
      }
    }));
}
function vn(e) {
  function t(f) {
    return Gn(f, e);
  }
  (Wt !== null && Gn(Wt, e),
    Ft !== null && Gn(Ft, e),
    It !== null && Gn(It, e),
    hn.forEach(t),
    mn.forEach(t));
  for (var l = 0; l < Qt.length; l++) {
    var a = Qt[l];
    a.blockedOn === e && (a.blockedOn = null);
  }
  for (; 0 < Qt.length && ((l = Qt[0]), l.blockedOn === null); )
    (jh(l), l.blockedOn === null && Qt.shift());
  if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
    for (a = 0; a < l.length; a += 3) {
      var n = l[a],
        u = l[a + 1],
        i = n[Re] || null;
      if (typeof u == "function") i || ir(l);
      else if (i) {
        var s = null;
        if (u && u.hasAttribute("formAction")) {
          if (((n = u), (i = u[Re] || null))) s = i.formAction;
          else if (Hs(n) !== null) continue;
        } else s = i.action;
        (typeof s == "function" ? (l[a + 1] = s) : (l.splice(a, 3), (a -= 3)),
          ir(l));
      }
    }
}
function qs(e) {
  this._internalRoot = e;
}
tc.prototype.render = qs.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(p(409));
  var l = t.current,
    a = Ye();
  xh(l, a, e, t, null, null);
};
tc.prototype.unmount = qs.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (e.tag === 0 && ca(),
      xh(e.current, 2, null, e, null, null),
      Iu(),
      (t[ga] = null));
  }
};
function tc(e) {
  this._internalRoot = e;
}
tc.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = oo();
    e = { blockedOn: null, target: e, priority: t };
    for (var l = 0; l < Qt.length && t !== 0 && t < Qt[l].priority; l++);
    (Qt.splice(l, 0, e), l === 0 && jh(e));
  }
};
var sr = Wr.version;
if (sr !== "19.0.0") throw Error(p(527, sr, "19.0.0"));
I.findDOMNode = function (e) {
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(p(188))
      : ((e = Object.keys(e).join(",")), Error(p(268, e)));
  return (
    (e = r0(t)),
    (e = e !== null ? lo(e) : null),
    (e = e === null ? null : e.stateNode),
    e
  );
};
var Cv = {
  bundleType: 0,
  version: "19.0.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: H,
  findFiberByHostInstance: hl,
  reconcilerVersion: "19.0.0",
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Zn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Zn.isDisabled && Zn.supportsFiber)
    try {
      ((bn = Zn.inject(Cv)), (Le = Zn));
    } catch {}
}
wu.createRoot = function (e, t) {
  if (!Fr(e)) throw Error(p(299));
  var l = !1,
    a = "",
    n = xd,
    u = Ed,
    i = Nd,
    s = null;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (l = !0),
      t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
      t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
      t.onCaughtError !== void 0 && (u = t.onCaughtError),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError),
      t.unstable_transitionCallbacks !== void 0 &&
        (s = t.unstable_transitionCallbacks)),
    (t = Sh(e, 1, !1, null, null, l, a, n, u, i, s, null)),
    (e[ga] = t.current),
    Ds(e.nodeType === 8 ? e.parentNode : e),
    new qs(t)
  );
};
wu.hydrateRoot = function (e, t, l) {
  if (!Fr(e)) throw Error(p(299));
  var a = !1,
    n = "",
    u = xd,
    i = Ed,
    s = Nd,
    f = null,
    r = null;
  return (
    l != null &&
      (l.unstable_strictMode === !0 && (a = !0),
      l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
      l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
      l.onCaughtError !== void 0 && (i = l.onCaughtError),
      l.onRecoverableError !== void 0 && (s = l.onRecoverableError),
      l.unstable_transitionCallbacks !== void 0 &&
        (f = l.unstable_transitionCallbacks),
      l.formState !== void 0 && (r = l.formState)),
    (t = Sh(e, 1, !0, t, l ?? null, a, n, u, i, s, f, r)),
    (t.context = Ah(null)),
    (l = t.current),
    (a = Ye()),
    (n = kt(a)),
    (n.callback = null),
    Kt(l, n, a),
    (t.current.lanes = a),
    pn(t, a),
    mt(t),
    (e[ga] = t.current),
    Ds(e),
    new tc(t)
  );
};
wu.version = "19.0.0";
function Th() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Th);
    } catch (e) {
      console.error(e);
    }
}
(Th(), (Gr.exports = wu));
var Rv = Gr.exports;
const zv = zr(Rv);
function Oh({ children: e, backdropClassName: t, onBackdropClick: l }) {
  const [a, n] = j.useState(!1);
  return (
    j.useEffect(() => {
      n(!0);
    }, []),
    a
      ? $r.createPortal(
          c.jsx("div", {
            className: t ? `modal-backdrop ${t}` : "modal-backdrop",
            role: "presentation",
            onClick: l,
            children: e,
          }),
          document.body,
        )
      : null
  );
}
function nl({
  title: e,
  children: t,
  onClose: l,
  footer: a,
  description: n,
  size: u = "md",
  compact: i,
  backdropClassName: s,
  className: f,
  bodyClassName: r,
  headerClassName: b,
  footerClassName: y,
  ariaLabel: h,
}) {
  return c.jsx(Oh, {
    backdropClassName: s,
    onBackdropClick: l,
    children: c.jsxs("section", {
      className: `modal modal--${u}${i ? " modal--compact" : ""}${f ? ` ${f}` : ""}`,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": h,
      onClick: (m) => m.stopPropagation(),
      children: [
        c.jsx("div", {
          className: `modal__header${b ? ` ${b}` : ""}`,
          children: c.jsxs("div", {
            children: [
              c.jsx("h3", { children: e }),
              n ? c.jsx("p", { children: n }) : null,
            ],
          }),
        }),
        c.jsx("div", {
          className: `modal__body${r ? ` ${r}` : ""}`,
          children: t,
        }),
        a
          ? c.jsx("div", {
              className: `modal__footer${y ? ` ${y}` : ""}`,
              children: a,
            })
          : null,
      ],
    }),
  });
}
const su = "xperp-mock-auth-stage",
  dl = "xperp-mock-auth-user",
  Pt = "xperp-mock-auth-profile",
  kn = "xperp-mock-otp-failures",
  Kn = "xperp-mock-otp-locked",
  Ls = {
    userId: "chat1004",
    id: "chat1004",
    name: "박운영",
    role: "MASTER",
    department: "운영 관리자",
  },
  Uv = {
    test0000: Ls,
    test1111: {
      userId: "test1111",
      id: "op2031",
      name: "김운영",
      role: "OPERATOR",
      department: "운영 담당",
    },
  },
  fr = (e) => {
    if (!e) return null;
    try {
      const t = JSON.parse(e);
      return !t.userId || !t.id || !t.name || !t.role || !t.department
        ? null
        : t;
    } catch {
      return null;
    }
  },
  Hv = (e) => Uv[e] ?? Ls,
  Mh = () => {
    if (typeof window > "u") return Ls;
    const e = fr(window.sessionStorage.getItem(Pt));
    if (e) return e;
    const t = fr(window.localStorage.getItem(Pt));
    if (t) return t;
    const l =
      window.sessionStorage.getItem(dl) ??
      window.localStorage.getItem(dl) ??
      "";
    return Hv(l);
  },
  qv = (e, t) => {
    if (typeof window > "u") return;
    const l = JSON.stringify(e);
    (window.sessionStorage.setItem(Pt, l),
      t
        ? window.localStorage.setItem(Pt, l)
        : window.localStorage.removeItem(Pt));
  },
  Lv = () => {
    typeof window > "u" ||
      (window.sessionStorage.removeItem(Pt),
      window.localStorage.removeItem(Pt));
  },
  Dh = 10,
  Ch = 12,
  Bv = "123456",
  Lc = 5,
  Yv = {
    title: "로그인 오류",
    message: `아이디 또는 비밀번호가 올바르지 않습니다.다시 확인해 주세요.`,
  },
  wv = {
    title: "권한 없음",
    message: `권한이 없는 사용자입니다.관리자에게 권한을 요청해 주세요.`,
  },
  rr = {
    title: "OTP 잠금",
    message: `OTP 오류로 잠금된 아이디 입니다.관리자에게 문의하세요.`,
  },
  or = {
    test0000: {
      password: "a123456789",
      profile: {
        userId: "test0000",
        id: "chat1004",
        name: "박승준",
        role: "MASTER",
        department: "운영 관리자",
      },
      allowed: !0,
    },
    test1111: {
      password: "a123456789",
      profile: {
        userId: "test1111",
        id: "op2031",
        name: "권태영",
        role: "OPERATOR",
        department: "운영 담당",
      },
      allowed: !0,
    },
    blocked0000: {
      password: "a123456789",
      profile: {
        userId: "blocked0000",
        id: "op9001",
        name: "차단계정",
        role: "OPERATOR",
        department: "권한 미부여",
      },
      allowed: !1,
    },
  },
  Vv = { userId: "", password: "", otp: "" },
  dr = (e) =>
    new Promise((t) => {
      window.setTimeout(t, e);
    }),
  Qv = (e) => {
    const t = Number(e ?? "0");
    return Number.isFinite(t) ? t : 0;
  },
  Bc = (e) => e.replace(/[^A-Za-z0-9]/g, "").slice(0, Dh),
  hr = (e) => e.replace(/[^A-Za-z0-9]/g, "").slice(0, Ch);
function AuthScreen({ onAuthenticated: e }) {
  const [t, l] = j.useState(Vv),
    [a, n] = j.useState(""),
    [u, i] = j.useState(""),
    [s, f] = j.useState(!1),
    [r, b] = j.useState(!1),
    [y, h] = j.useState(!1),
    [m, A] = j.useState(0),
    [N, R] = j.useState(!1),
    [o, d] = j.useState(null),
    v = j.useMemo(
      () =>
        N
          ? "OTP 오류로 잠금된 아이디입니다. 관리자에게 문의하세요."
          : m > 0
            ? `OTP 인증에 실패했습니다. (${m}/${Lc})`
            : "OTP를 입력하면 로그인 절차를 완료합니다.",
      [m, N],
    );
  j.useEffect(() => {
    if (typeof window > "u") return;
    const Q = window.sessionStorage.getItem(su),
      se =
        window.sessionStorage.getItem(dl) ??
        window.localStorage.getItem(dl) ??
        "",
      xe = window.sessionStorage.getItem(Kn) === "true",
      x = Qv(window.sessionStorage.getItem(kn));
    if (Q === "authenticated") {
      e();
      return;
    }
    const z = Bc(se);
    (l((U) => ({ ...U, userId: z })),
      R(xe),
      A(x),
      h(Q === "otp_pending" && !!z));
  }, [e]);
  const g = (Q) => (se) => {
      const xe = Q === "userId" ? Bc(se) : Q === "password" ? hr(se) : se;
      (l((x) => ({ ...x, [Q]: xe })), i(""));
    },
    E = (Q) => {
      d(Q);
    },
    C = () => {
      d(null);
    },
    T = () => {
      (h(!0), i(""), n(""), A(0), R(!1));
    },
    D = () => {
      (h(!1), l((Q) => ({ ...Q, otp: "" })), n(""), i(""));
    },
    S = async (Q) => {
      if ((Q.preventDefault(), s)) return;
      if (!t.userId.trim() || !t.password.trim()) {
        i("아이디와 비밀번호를 입력해 주세요.");
        return;
      }
      const se = Bc(t.userId.trim()),
        xe = hr(t.password.trim()),
        x = or[se];
      if (!x || x.password !== xe) {
        E(Yv);
        return;
      }
      if (!x.allowed) {
        E(wv);
        return;
      }
      (f(!0),
        n("OTP 입력 창을 여는 중입니다."),
        window.sessionStorage.setItem(su, "otp_pending"),
        window.sessionStorage.setItem(dl, se),
        window.sessionStorage.setItem(kn, "0"),
        window.sessionStorage.removeItem(Kn),
        r
          ? window.localStorage.setItem(dl, se)
          : window.localStorage.removeItem(dl),
        await dr(250),
        f(!1),
        T());
    },
    _ = async (Q) => {
      if ((Q.preventDefault(), s || !y)) return;
      if (N) {
        E(rr);
        return;
      }
      if (t.otp.trim().length !== 6) {
        i("6자리 OTP를 입력해 주세요.");
        return;
      }
      if ((f(!0), t.otp.trim() !== Bv)) {
        const x = m + 1,
          z = x >= Lc;
        (A(x),
          window.sessionStorage.setItem(kn, String(x)),
          z
            ? (R(!0), window.sessionStorage.setItem(Kn, "true"), E(rr))
            : i(`OTP 인증에 실패했습니다. (${x}/${Lc})`),
          f(!1));
        return;
      }
      const se = or[t.userId.trim()],
        xe = (se == null ? void 0 : se.profile) ?? {
          userId: t.userId.trim(),
          id: t.userId.trim(),
          name: t.userId.trim(),
          role: "MASTER",
          department: "운영 관리자",
        };
      (qv(xe, r),
        window.sessionStorage.setItem(su, "authenticated"),
        window.sessionStorage.setItem(Pt, JSON.stringify(xe)),
        window.sessionStorage.removeItem(kn),
        window.sessionStorage.removeItem(Kn),
        n("대시보드로 이동합니다."),
        await dr(250),
        e());
    },
    te = s || !t.userId.trim() || !t.password.trim(),
    De = s || N || t.otp.trim().length !== 6;
  return c.jsxs("main", {
    className: "auth-shell auth-shell--standalone",
    children: [
      c.jsxs("section", {
        className: "auth-card auth-standalone",
        children: [
          c.jsxs("div", {
            className: "auth-card__intro auth-standalone__intro",
            children: [
              c.jsx("span", {
                className: "auth-card__badge",
                children: "Xp도우미",
              }),
              c.jsx("h1", {
                className: "auth-card__title",
                children: "Xp도우미 관리자",
              }),
              c.jsx("p", {
                className: "auth-card__eyebrow",
                children: "관리자 전용 시스템",
              }),
              c.jsxs("p", {
                className: "auth-card__description",
                children: [
                  "본 시스템은 내부 관리자 전용입니다.",
                  c.jsx("br", {}),
                  "무단 접근 및 정보 열람 시 관련 법령에 따라 책임이 발생할 수 있습니다.",
                ],
              }),
            ],
          }),
          c.jsxs("form", {
            className: "auth-form",
            onSubmit: S,
            children: [
              c.jsxs("div", {
                className: "auth-form__header",
                children: [
                  c.jsx("h2", {
                    className: "auth-form__title",
                    children: "관리자 로그인",
                  }),
                  c.jsx("p", {
                    className: "auth-form__caption",
                    children: "승인된 계정만 접속 가능합니다.",
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "auth-form__fields",
                children: [
                  c.jsxs("label", {
                    className: "field auth-field",
                    children: [
                      c.jsx("span", {
                        className: "field__label",
                        children: "아이디",
                      }),
                      c.jsx("input", {
                        className: "field__input auth-input",
                        maxLength: Dh,
                        value: t.userId,
                        onChange: (Q) => g("userId")(Q.target.value),
                        placeholder: "예: admin01",
                        autoComplete: "username",
                        inputMode: "text",
                      }),
                    ],
                  }),
                  c.jsxs("label", {
                    className: "field auth-field",
                    children: [
                      c.jsx("span", {
                        className: "field__label",
                        children: "비밀번호",
                      }),
                      c.jsx("input", {
                        type: "password",
                        className: "field__input auth-input",
                        maxLength: Ch,
                        value: t.password,
                        onChange: (Q) => g("password")(Q.target.value),
                        placeholder: "비밀번호 입력",
                        autoComplete: "current-password",
                        inputMode: "text",
                      }),
                    ],
                  }),
                  c.jsxs("label", {
                    className: "auth-remember",
                    children: [
                      c.jsx("input", {
                        type: "checkbox",
                        checked: r,
                        onChange: (Q) => b(Q.target.checked),
                      }),
                      c.jsx("span", { children: "아이디 저장" }),
                    ],
                  }),
                ],
              }),
              c.jsx("div", {
                className: "auth-form__actions",
                children: c.jsx("button", {
                  type: "submit",
                  className: "primary-button auth-submit",
                  disabled: te,
                  children: s ? "처리 중..." : "로그인",
                }),
              }),
              c.jsxs("div", {
                className: "auth-form__feedback",
                "aria-live": "polite",
                children: [
                  u
                    ? c.jsx("p", { className: "auth-error", children: u })
                    : null,
                  !u && a
                    ? c.jsx("p", { className: "auth-helper", children: a })
                    : null,
                ],
              }),
            ],
          }),
        ],
      }),
      y
        ? c.jsx(Oh, {
            backdropClassName: "auth-otp-backdrop",
            onBackdropClick: D,
            children: c.jsxs("section", {
              className: "modal auth-otp-modal",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "OTP 인증",
              onClick: (Q) => Q.stopPropagation(),
              children: [
                c.jsx("div", {
                  className: "modal__header auth-otp-modal__header",
                  children: c.jsxs("div", {
                    children: [
                      c.jsx("h3", { children: "OTP 인증" }),
                      c.jsx("p", {
                        className: "auth-otp-modal__caption",
                        children: v,
                      }),
                    ],
                  }),
                }),
                c.jsxs("form", {
                  className: "auth-otp-modal__body",
                  onSubmit: _,
                  children: [
                    c.jsxs("label", {
                      className: "field auth-otp-field",
                      children: [
                        c.jsx("span", {
                          className: "field__label",
                          children: "OTP",
                        }),
                        c.jsx("input", {
                          className: "field__input auth-input auth-input--otp",
                          value: t.otp,
                          onChange: (Q) => g("otp")(Q.target.value),
                          placeholder: "6자리 OTP 입력",
                          inputMode: "numeric",
                          autoComplete: "one-time-code",
                          maxLength: 6,
                          disabled: N,
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "auth-form__feedback",
                      "aria-live": "polite",
                      children: [
                        u
                          ? c.jsx("p", { className: "auth-error", children: u })
                          : null,
                        !u && a
                          ? c.jsx("p", {
                              className: "auth-helper",
                              children: a,
                            })
                          : null,
                      ],
                    }),
                    c.jsxs("div", {
                      className: "auth-form__actions auth-otp-modal__actions",
                      children: [
                        c.jsx("button", {
                          type: "button",
                          className: "secondary-button auth-cancel",
                          onClick: D,
                          children: "취소",
                        }),
                        c.jsx("button", {
                          type: "submit",
                          className: "primary-button auth-submit",
                          disabled: De,
                          children: s ? "처리 중..." : "인증 완료",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
        : null,
      o
        ? c.jsx(nl, {
            title: o.title,
            ariaLabel: o.title,
            onClose: C,
            size: "sm",
            compact: !0,
            backdropClassName: "auth-notice-backdrop",
            className: "auth-notice-modal",
            headerClassName: "modal__header--tight auth-notice-modal__header",
            bodyClassName: "auth-notice-modal__body",
            footerClassName: "modal__footer--split",
            footer: c.jsx("button", {
              type: "button",
              className: "primary-button",
              onClick: C,
              children: "확인",
            }),
            children: c.jsx("p", {
              className: "auth-notice-modal__message",
              children: o.message,
            }),
          })
        : null,
    ],
  });
}
const Ul = (e, t, l) => {
    const a = Number(((t / Math.max(e, 1)) * 100).toFixed(1));
    return {
      count: t,
      ratio: a,
      keywords: l.map((n, u) => ({
        rank: u + 1,
        label: n.label,
        count: n.count,
        ratio: Number(((n.count / Math.max(t, 1)) * 100).toFixed(1)),
      })),
    };
  },
  DASHBOARD_SECTIONS = {
    DAY: {
      selectedRange: "DAY",
      metrics: [
        {
          key: "visitors",
          label: "접속자 수",
          value: 184,
          compareLabel: "전일 대비",
          compareRate: 4.8,
          compareDirection: "UP",
        },
        {
          key: "inquiries",
          label: "문의 수",
          value: 326,
          compareLabel: "전일 대비",
          compareRate: 2.1,
          compareDirection: "UP",
        },
        {
          key: "failures",
          label: "실패 수",
          value: 4,
          compareLabel: "전일 대비",
          compareRate: 1.2,
          compareDirection: "DOWN",
        },
      ],
      trend: [
        { label: "3/31", dateLabel: "2026-03-31", visitors: 41, inquiries: 28 },
        { label: "4/1", dateLabel: "2026-04-01", visitors: 53, inquiries: 39 },
        { label: "4/2", dateLabel: "2026-04-02", visitors: 68, inquiries: 51 },
        { label: "4/3", dateLabel: "2026-04-03", visitors: 74, inquiries: 58 },
        { label: "4/4", dateLabel: "2026-04-04", visitors: 83, inquiries: 62 },
        { label: "4/5", dateLabel: "2026-04-05", visitors: 91, inquiries: 68 },
        { label: "4/6", dateLabel: "2026-04-06", visitors: 97, inquiries: 72 },
      ],
      fixedKeywords: [
        { rank: 1, label: "비밀번호 변경", count: 92, ratio: 42.2 },
        { rank: 2, label: "접속 지연", count: 61, ratio: 28 },
        { rank: 3, label: "자동 등록", count: 44, ratio: 20.2 },
      ],
      fixedFeedbackRatio: {
        totalCount: 340,
        defaultReaction: "POSITIVE",
        positive: Ul(340, 187, [
          { label: "응답이 빨라요", count: 52 },
          { label: "설명이 명확해요", count: 44 },
          { label: "추천할 만해요", count: 33 },
          { label: "사용하기 쉬워요", count: 29 },
          { label: "불편함이 없어요", count: 24 },
        ]),
        negative: Ul(340, 153, [
          { label: "응답이 늦어요", count: 41 },
          { label: "의도가 조금 달라요", count: 36 },
          { label: "설명이 부족해요", count: 28 },
          { label: "오류가 발생했어요", count: 25 },
          { label: "결과가 기대와 달라요", count: 23 },
        ]),
      },
    },
    WEEK: {
      selectedRange: "WEEK",
      metrics: [
        {
          key: "visitors",
          label: "접속자 수",
          value: 1051,
          compareLabel: "지난주 대비",
          compareRate: 5,
          compareDirection: "UP",
        },
        {
          key: "inquiries",
          label: "문의 수",
          value: 1820,
          compareLabel: "지난주 대비",
          compareRate: 3.4,
          compareDirection: "UP",
        },
        {
          key: "failures",
          label: "실패 수",
          value: 19,
          compareLabel: "지난주 대비",
          compareRate: 0.8,
          compareDirection: "DOWN",
        },
      ],
      trend: [
        {
          label: "4월 1주차",
          dateLabel: "2026-04-01 ~ 2026-04-07",
          visitors: 330,
          inquiries: 250,
        },
        {
          label: "4월 2주차",
          dateLabel: "2026-04-08 ~ 2026-04-14",
          visitors: 430,
          inquiries: 320,
        },
        {
          label: "4월 3주차",
          dateLabel: "2026-04-15 ~ 2026-04-21",
          visitors: 500,
          inquiries: 360,
        },
        {
          label: "4월 4주차",
          dateLabel: "2026-04-22 ~ 2026-04-28",
          visitors: 495,
          inquiries: 350,
        },
        {
          label: "4월 5주차",
          dateLabel: "2026-04-29 ~ 2026-05-05",
          visitors: 540,
          inquiries: 410,
        },
        {
          label: "4월 6주차",
          dateLabel: "2026-05-06 ~ 2026-05-12",
          visitors: 642,
          inquiries: 506,
        },
        {
          label: "4월 7주차",
          dateLabel: "2026-05-13 ~ 2026-05-19",
          visitors: 492,
          inquiries: 370,
        },
      ],
      fixedKeywords: [
        { rank: 1, label: "비밀번호 변경", count: 1520, ratio: 44.8 },
        { rank: 2, label: "접속 지연", count: 985, ratio: 29.1 },
        { rank: 3, label: "자동 등록", count: 503, ratio: 14.8 },
      ],
      fixedFeedbackRatio: {
        totalCount: 1680,
        defaultReaction: "POSITIVE",
        positive: Ul(1680, 924, [
          { label: "응답이 빨라요", count: 260 },
          { label: "설명이 명확해요", count: 210 },
          { label: "추천할 만해요", count: 175 },
          { label: "사용하기 쉬워요", count: 150 },
          { label: "불편함이 없어요", count: 129 },
        ]),
        negative: Ul(1680, 756, [
          { label: "응답이 늦어요", count: 230 },
          { label: "의도가 조금 달라요", count: 162 },
          { label: "설명이 부족해요", count: 143 },
          { label: "오류가 발생했어요", count: 121 },
          { label: "결과가 기대와 달라요", count: 100 },
        ]),
      },
    },
    MONTH: {
      selectedRange: "MONTH",
      metrics: [
        {
          key: "visitors",
          label: "접속자 수",
          value: 4216,
          compareLabel: "전월 대비",
          compareRate: 7.2,
          compareDirection: "UP",
        },
        {
          key: "inquiries",
          label: "문의 수",
          value: 8014,
          compareLabel: "전월 대비",
          compareRate: 4.6,
          compareDirection: "UP",
        },
        {
          key: "failures",
          label: "실패 수",
          value: 83,
          compareLabel: "전월 대비",
          compareRate: 2.4,
          compareDirection: "DOWN",
        },
      ],
      trend: [
        { label: "10월", dateLabel: "2025-10", visitors: 1200, inquiries: 940 },
        {
          label: "11월",
          dateLabel: "2025-11",
          visitors: 1420,
          inquiries: 1110,
        },
        {
          label: "12월",
          dateLabel: "2025-12",
          visitors: 1880,
          inquiries: 1425,
        },
        { label: "1월", dateLabel: "2026-01", visitors: 2140, inquiries: 1632 },
        { label: "2월", dateLabel: "2026-02", visitors: 2256, inquiries: 1714 },
        { label: "3월", dateLabel: "2026-03", visitors: 2390, inquiries: 1788 },
        { label: "4월", dateLabel: "2026-04", visitors: 2574, inquiries: 1847 },
      ],
      fixedKeywords: [
        { rank: 1, label: "비밀번호 변경", count: 3610, ratio: 48.1 },
        { rank: 2, label: "접속 지연", count: 1922, ratio: 25.6 },
        { rank: 3, label: "자동 등록", count: 1316, ratio: 17.5 },
      ],
      fixedFeedbackRatio: {
        totalCount: 11240,
        defaultReaction: "POSITIVE",
        positive: Ul(11240, 6519, [
          { label: "응답이 빨라요", count: 1820 },
          { label: "설명이 명확해요", count: 1512 },
          { label: "추천할 만해요", count: 1260 },
          { label: "사용하기 쉬워요", count: 1014 },
          { label: "불편함이 없어요", count: 913 },
        ]),
        negative: Ul(11240, 4721, [
          { label: "응답이 늦어요", count: 1290 },
          { label: "의도가 조금 달라요", count: 1174 },
          { label: "설명이 부족해요", count: 980 },
          { label: "오류가 발생했어요", count: 745 },
          { label: "결과가 기대와 달라요", count: 532 },
        ]),
      },
    },
  };
function SectionHeader({ title: e, actions: t, className: l, titleAs: a = "h2" }) {
  const n = a;
  return c.jsxs("div", {
    className: `section-header${l ? ` ${l}` : ""}`,
    children: [
      c.jsx("div", {
        className: "section-header__copy",
        children: c.jsx(n, { className: "section-header__title", children: e }),
      }),
      t
        ? c.jsx("div", { className: "section-header__actions", children: t })
        : null,
    ],
  });
}
const mr = (e) =>
    e
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^0-9a-z가-힣]/gi, ""),
  Bu = (e, t) => t.localeCompare(e),
  fu = (e) => (Number.isInteger(e) ? `${e}%` : `${e.toFixed(1)}%`);
function KeywordList({ title: e, items: t, bare: l }) {
  return c.jsxs("section", {
    className: `dashboard-keyword-card${l ? " dashboard-keyword-card--bare" : ""}`,
    children: [
      c.jsx(SectionHeader, { title: e, className: "dashboard-keyword-card__header" }),
      t.length === 0
        ? c.jsx("div", {
            className: "dashboard-keyword-empty",
            children: "조건에 맞는 질문 키워드가 없습니다.",
          })
        : c.jsx("ol", {
            className: "keyword-list",
            children: t.map((a) =>
              c.jsxs(
                "li",
                {
                  className: "keyword-list__item",
                  children: [
                    c.jsxs("div", {
                      className: "keyword-list__left",
                      children: [
                        c.jsx("span", {
                          className: "keyword-list__rank",
                          children: a.rank,
                        }),
                        c.jsx("span", {
                          className: "keyword-list__label",
                          children: a.label,
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "keyword-list__stats",
                      children: [
                        c.jsxs("strong", {
                          className: "keyword-list__count",
                          children: [a.count.toLocaleString(), "건"],
                        }),
                        c.jsx("span", {
                          className: "keyword-list__divider",
                          children: "·",
                        }),
                        c.jsx("span", {
                          className: "keyword-list__ratio",
                          children: fu(a.ratio),
                        }),
                      ],
                    }),
                  ],
                },
                a.rank,
              ),
            ),
          }),
    ],
  });
}
const Yc = {
    POSITIVE: { label: "만족해요", tooltipLabel: "만족해요" },
    NEGATIVE: { label: "아쉬워요", tooltipLabel: "아쉬워요" },
  },
  vr = 100,
  ct = 50,
  Jn = 42,
  La = 24,
  $n = (e, t, l, a) => {
    const n = ((a - 90) * Math.PI) / 180;
    return { x: e + l * Math.cos(n), y: t + l * Math.sin(n) };
  },
  yr = (e, t) => {
    const l = $n(ct, ct, Jn, t),
      a = $n(ct, ct, Jn, e),
      n = $n(ct, ct, La, e),
      u = $n(ct, ct, La, t),
      i = t - e <= 180 ? 0 : 1;
    return [
      `M ${l.x.toFixed(3)} ${l.y.toFixed(3)}`,
      `A ${Jn} ${Jn} 0 ${i} 0 ${a.x.toFixed(3)} ${a.y.toFixed(3)}`,
      `L ${n.x.toFixed(3)} ${n.y.toFixed(3)}`,
      `A ${La} ${La} 0 ${i} 1 ${u.x.toFixed(3)} ${u.y.toFixed(3)}`,
      "Z",
    ].join(" ");
  };
function FeedbackRatio({ data: e }) {
  const [t, l] = j.useState(e.defaultReaction),
    [a, n] = j.useState(null),
    u = (e.positive.count / e.totalCount) * 100,
    i = (e.negative.count / e.totalCount) * 100,
    s = j.useMemo(
      () => yr(0, (e.positive.count / e.totalCount) * 360),
      [e.positive.count, e.totalCount],
    ),
    f = j.useMemo(
      () => yr((e.positive.count / e.totalCount) * 360, 360),
      [e.positive.count, e.totalCount],
    ),
    r = a ? e[a === "POSITIVE" ? "positive" : "negative"] : null,
    b = `${Yc[t].label} TOP5 키워드`;
  return c.jsxs("section", {
    className: "panel panel--side feedback-ratio-card",
    children: [
      c.jsx(SectionHeader, {
        title: "피드백 비율",
        className: "feedback-ratio-card__header",
      }),
      c.jsxs("div", {
        className: "feedback-ratio",
        children: [
          c.jsxs("div", {
            className: "feedback-ratio__chart-shell",
            children: [
              c.jsxs("svg", {
                className: "feedback-ratio__chart",
                viewBox: `0 0 ${vr} ${vr}`,
                role: "img",
                "aria-label": `피드백 비율 도넛 차트. 만족해요 ${fu(u)}, 아쉬워요 ${fu(i)}`,
                children: [
                  c.jsx("path", {
                    d: s,
                    className:
                      "feedback-ratio__slice feedback-ratio__slice--positive",
                    onMouseEnter: () => n("POSITIVE"),
                    onMouseLeave: () => n(null),
                    onFocus: () => n("POSITIVE"),
                    onBlur: () => n(null),
                    tabIndex: 0,
                  }),
                  c.jsx("path", {
                    d: f,
                    className:
                      "feedback-ratio__slice feedback-ratio__slice--negative",
                    onMouseEnter: () => n("NEGATIVE"),
                    onMouseLeave: () => n(null),
                    onFocus: () => n("NEGATIVE"),
                    onBlur: () => n(null),
                    tabIndex: 0,
                  }),
                  c.jsx("circle", {
                    cx: ct,
                    cacheQaRecords: ct,
                    r: La,
                    className: "feedback-ratio__hole",
                  }),
                  c.jsx("text", {
                    x: "50",
                    y: "46",
                    textAnchor: "middle",
                    className: "feedback-ratio__center-label",
                    children: "전체 건수",
                  }),
                  c.jsxs("text", {
                    x: "50",
                    y: "60",
                    textAnchor: "middle",
                    className: "feedback-ratio__center-value",
                    children: [e.totalCount.toLocaleString(), "건"],
                  }),
                ],
              }),
              r
                ? c.jsxs("div", {
                    className: "feedback-ratio__tooltip",
                    "aria-live": "polite",
                    children: [
                      c.jsx("span", {
                        className: "feedback-ratio__tooltip-label",
                        children: Yc[a].tooltipLabel,
                      }),
                      c.jsxs("strong", {
                        children: [
                          r.count.toLocaleString(),
                          "건 · ",
                          fu(r.ratio),
                        ],
                      }),
                    ],
                  })
                : null,
            ],
          }),
          c.jsx("div", {
            className: "feedback-toggle",
            role: "tablist",
            "aria-label": "피드백 유형",
            children: ["POSITIVE", "NEGATIVE"].map((y) => {
              const h = y === t;
              return c.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": h,
                  className: `feedback-toggle__button${h ? " is-selected" : ""}`,
                  onClick: () => l(y),
                  children: Yc[y].label,
                },
                y,
              );
            }),
          }),
          c.jsx(KeywordList, {
            title: b,
            items: t === "POSITIVE" ? e.positive.keywords : e.negative.keywords,
            bare: !0,
          }),
        ],
      }),
    ],
  });
}
function MetricCard({ metric: e }) {
  const t = e.compareDirection === "UP" ? "+" : "-",
    l = e.compareDirection === "UP" ? "is-up" : "is-down";
  return c.jsxs("article", {
    className: "metric-card",
    children: [
      c.jsx("div", { className: "metric-card__label", children: e.label }),
      c.jsxs("div", {
        className: "metric-card__value",
        children: [e.value.toLocaleString(), "건"],
      }),
      c.jsxs("div", {
        className: `metric-card__compare ${l}`,
        children: [
          c.jsxs("strong", { children: [t, " ", e.compareRate, "%"] }),
          c.jsx("span", { children: e.compareLabel }),
        ],
      }),
    ],
  });
}
const kv = {
    DAY: { label: "일간", note: "오늘 기준 7일" },
    WEEK: { label: "주간", note: "이번주 기준 7주" },
    MONTH: { label: "월간", note: "이번달 기준 7달" },
  },
  Kv = ["DAY", "WEEK", "MONTH"];
function TimeRangeTabs({ value: e, onChange: t }) {
  return c.jsx("div", {
    className: "time-range-tabs",
    role: "tablist",
    "aria-label": "기간 선택",
    children: Kv.map((l) => {
      const a = l === e;
      return c.jsx(
        "button",
        {
          type: "button",
          className: `time-range-tabs__button${a ? " is-selected" : ""}`,
          onClick: () => t(l),
          children: kv[l].label,
        },
        l,
      );
    }),
  });
}
const wc = 760,
  Ht = 340,
  et = 32,
  Vc = 24,
  $v = 5,
  br = (e, t, l) => Math.min(Math.max(e, t), l),
  Wv = (e, t, l, a) => {
    const n = Math.max(a, 0),
      u = Math.min($v, l / 2, n / 2);
    return n
      ? u === 0
        ? `M ${e} ${t} H ${e + l} V ${t + n} H ${e} Z`
        : [
            `M ${e} ${t + n}`,
            `V ${t + u}`,
            `Q ${e} ${t} ${e + u} ${t}`,
            `H ${e + l - u}`,
            `Q ${e + l} ${t} ${e + l} ${t + u}`,
            `V ${t + n}`,
            "Z",
          ].join(" ")
      : "";
  };
function TrendChart({ points: e }) {
  const [t, l] = j.useState(null),
    a = Math.max(...e.map((y) => y.visitors), 1),
    n = Math.max(...e.map((y) => y.inquiries), 1),
    i = Math.max(a, n) || 1,
    s = j.useMemo(
      () =>
        e.map((y, h) => {
          const m = et + (h * (wc - et * 2)) / Math.max(e.length - 1, 1),
            A = Ht - et - (y.visitors / i) * (Ht - et * 2),
            N = Ht - et - (y.inquiries / i) * (Ht - et * 2);
          return { ...y, x: m, visitorY: A, inquiryY: N };
        }),
      [e, i],
    ),
    f = s
      .map((y, h) => `${h === 0 ? "M" : "L"} ${y.x} ${y.inquiryY}`)
      .join(" "),
    r = (y, h) => {
      var d;
      const m =
        (d = y.currentTarget.ownerSVGElement) == null
          ? void 0
          : d.getBoundingClientRect();
      if (!m) return;
      const A = y.clientX - m.left + 14,
        N = y.clientY - m.top - 14,
        R = br(A, 12, Math.max(m.width - 208, 12)),
        o = br(N, 12, Math.max(m.height - 104, 12));
      l({ point: h, left: R, top: o });
    };
  if (!s.length)
    return c.jsxs("div", {
      className: "trend-chart trend-chart--empty",
      children: [
        c.jsx("div", {
          className: "trend-chart__empty",
          children: "표시할 차트 데이터가 없습니다.",
        }),
        c.jsxs("div", {
          className: "trend-chart__legend",
          children: [
            c.jsxs("span", {
              className: "trend-chart__legend-item",
              children: [
                c.jsx("span", {
                  className:
                    "trend-chart__legend-dot trend-chart__legend-dot--bar",
                }),
                c.jsx("span", { children: "접속자 수" }),
              ],
            }),
            c.jsxs("span", {
              className: "trend-chart__legend-item",
              children: [
                c.jsx("span", { className: "trend-chart__legend-dot" }),
                c.jsx("span", { children: "문의 수" }),
              ],
            }),
          ],
        }),
      ],
    });
  const b = t == null ? void 0 : t.point;
  return c.jsxs("div", {
    className: "trend-chart",
    children: [
      c.jsxs("div", {
        className: "trend-chart__stage",
        children: [
          c.jsxs("svg", {
            viewBox: `0 0 ${wc} ${Ht}`,
            className: "trend-chart__svg",
            role: "img",
            children: [
              [0, 1, 2, 3, 4].map((y) => {
                const h = et + (y * (Ht - et * 2)) / 4;
                return c.jsx(
                  "line",
                  {
                    x1: et,
                    y1: h,
                    x2: wc - et,
                    y2: h,
                    className: "trend-chart__grid",
                  },
                  y,
                );
              }),
              s.map((y) => {
                const h = y.x - Vc / 2,
                  m = Ht - et - y.visitorY,
                  A = Wv(h, y.visitorY, Vc, m);
                return c.jsxs(
                  "g",
                  {
                    className: "trend-chart__bar-group",
                    onMouseEnter: (N) => r(N, y),
                    onMouseMove: (N) => r(N, y),
                    onMouseLeave: () => l(null),
                    children: [
                      c.jsx("path", { d: A, className: "trend-chart__bar" }),
                      c.jsx("rect", {
                        x: h - 4,
                        y: y.visitorY,
                        width: Vc + 8,
                        height: m,
                        fill: "transparent",
                        className: "trend-chart__bar-hitarea",
                      }),
                      c.jsx("text", {
                        x: y.x,
                        y: Ht - 8,
                        textAnchor: "middle",
                        className: "trend-chart__label",
                        children: y.label,
                      }),
                    ],
                  },
                  `${y.label}-bar`,
                );
              }),
              c.jsx("path", { d: f, className: "trend-chart__path" }),
              s.map((y) =>
                c.jsxs(
                  "g",
                  {
                    className: "trend-chart__point-group",
                    onMouseEnter: (h) => r(h, y),
                    onMouseMove: (h) => r(h, y),
                    onMouseLeave: () => l(null),
                    children: [
                      c.jsx("circle", {
                        cx: y.x,
                        cacheQaRecords: y.inquiryY,
                        r: "5",
                        className: "trend-chart__point",
                      }),
                      c.jsx("circle", {
                        cx: y.x,
                        cacheQaRecords: y.inquiryY,
                        r: "10",
                        fill: "transparent",
                      }),
                    ],
                  },
                  y.label,
                ),
              ),
            ],
          }),
          b && t
            ? c.jsxs("div", {
                className: "trend-chart__tooltip",
                style: { left: t.left, top: t.top },
                "aria-live": "polite",
                children: [
                  c.jsx("span", {
                    className: "trend-chart__tooltip-date",
                    children: b.dateLabel,
                  }),
                  c.jsxs("strong", {
                    children: [b.visitors.toLocaleString(), " 접속자"],
                  }),
                  c.jsxs("span", {
                    children: [b.inquiries.toLocaleString(), " 문의"],
                  }),
                ],
              })
            : null,
        ],
      }),
      c.jsxs("div", {
        className: "trend-chart__legend",
        children: [
          c.jsxs("span", {
            className: "trend-chart__legend-item",
            children: [
              c.jsx("span", {
                className:
                  "trend-chart__legend-dot trend-chart__legend-dot--bar",
              }),
              c.jsx("span", { children: "접속자 수" }),
            ],
          }),
          c.jsxs("span", {
            className: "trend-chart__legend-item",
            children: [
              c.jsx("span", { className: "trend-chart__legend-dot" }),
              c.jsx("span", { children: "문의 수" }),
            ],
          }),
        ],
      }),
    ],
  });
}
function DashboardView({ data: e }) {
  const [t, l] = j.useState(e.selectedRange),
    a = DASHBOARD_SECTIONS[t];
  return c.jsxs("div", {
    className: "dashboard-grid",
    children: [
      c.jsxs("section", {
        className: "panel panel--main",
        children: [
          c.jsx(SectionHeader, {
            title: "기간별 지표 현황",
            actions: c.jsx("div", {
              className: "dashboard-header-actions",
              children: c.jsx(TimeRangeTabs, { value: t, onChange: l }),
            }),
          }),
          c.jsx("div", {
            className: "metric-card-grid",
            children: a.metrics.map((n) => c.jsx(MetricCard, { metric: n }, n.key)),
          }),
          c.jsx(TrendChart, { points: a.trend }),
        ],
      }),
      c.jsxs("section", {
        className: "dashboard-side",
        children: [
          c.jsx(KeywordList, { title: "질문 키워드", items: e.fixedKeywords }),
          c.jsx(FeedbackRatio, { data: e.fixedFeedbackRatio }),
        ],
      }),
    ],
  });
}
const contentDocuments = [
  {
    id: "doc-001",
    name: "챗봇 운영 매뉴얼",
    type: "MANUAL",
    path: "/rag/manual/chatbot-operations",
    author: "박운영",
    createdAt: "2026-03-28 09:10",
    updatedAt: "2026-04-01 14:22",
    status: "ACTIVE",
    fileName: "chatbot-operations.pdf",
    fileSize: "12.4MB",
    history: [
      {
        id: "hist-001",
        version: "v3",
        actor: "박운영",
        action: "수정",
        reason: "업무 프로세스 변경 반영",
        occurredAt: "2026-04-01 14:22",
      },
      {
        id: "hist-002",
        version: "v2",
        actor: "김관리",
        action: "업로드",
        reason: "초기 반영",
        occurredAt: "2026-03-28 09:10",
      },
    ],
  },
  {
    id: "doc-002",
    name: "FAQ 응답 모음",
    type: "FAQ",
    path: "/rag/faq/common-questions",
    author: "박운영",
    createdAt: "2026-03-30 11:05",
    updatedAt: "2026-04-02 10:40",
    status: "ACTIVE",
    fileName: "faq-collection.docx",
    fileSize: "2.1MB",
    history: [
      {
        id: "hist-003",
        version: "v2",
        actor: "박운영",
        action: "수정",
        reason: "질문 분류 보완",
        occurredAt: "2026-04-02 10:40",
      },
    ],
  },
  {
    id: "doc-003",
    name: "수납 안내서",
    type: "MANUAL",
    path: "/rag/manual/payment-guide",
    author: "김관리",
    createdAt: "2026-03-25 16:20",
    updatedAt: "2026-03-29 08:15",
    status: "ACTIVE",
    fileName: "payment-guide.md",
    fileSize: "0.8MB",
    history: [
      {
        id: "hist-004",
        version: "v1",
        actor: "김관리",
        action: "업로드",
        reason: "신규 등록",
        occurredAt: "2026-03-25 16:20",
      },
    ],
  },
  {
    id: "doc-004",
    name: "차량등록 FAQ",
    type: "FAQ",
    path: "/rag/faq/vehicle-registration",
    author: "박운영",
    createdAt: "2026-03-20 13:35",
    updatedAt: "2026-03-20 13:35",
    status: "FAILED",
    fileName: "vehicle-registration.txt",
    fileSize: "0.2MB",
    history: [
      {
        id: "hist-005",
        version: "v1",
        actor: "박운영",
        action: "업로드 실패",
        reason: "파싱 오류",
        occurredAt: "2026-03-20 13:35",
      },
    ],
  },
];
async function createContentDocument(e) {
  return {
    id: `doc-${Date.now()}`,
    name: e.fileName.replace(/\.[^.]+$/, ""),
    type: e.type,
    path: e.path,
    author: "박운영",
    createdAt: "2026-04-02 09:00",
    updatedAt: "2026-04-02 09:00",
    status: "ACTIVE",
    fileName: e.fileName,
    fileSize: "0MB",
    history: [
      {
        id: `hist-${Date.now()}`,
        version: "v1",
        actor: "박운영",
        action: "업로드",
        reason: "신규 등록",
        occurredAt: "2026-04-02 09:00",
      },
    ],
  };
}
function DetailFrame({
  title: e,
  actions: t,
  children: l,
  className: a,
  bodyClassName: n,
  titleAs: u = "h3",
}) {
  return c.jsxs("section", {
    className: `detail-frame${a ? ` ${a}` : ""}`,
    children: [
      c.jsx(SectionHeader, {
        title: e,
        actions: t,
        className: "detail-frame__header",
        titleAs: u,
      }),
      c.jsx("div", {
        className: `detail-frame__body${n ? ` ${n}` : ""}`,
        children: l,
      }),
    ],
  });
}
function ToastStack({ items: e }) {
  return e.length === 0
    ? null
    : c.jsx("div", {
        className: "toast-stack",
        "aria-live": "polite",
        "aria-atomic": "true",
        children: e.map((t) =>
          c.jsx(
            "div",
            {
              className: `toast toast--${t.tone}`,
              role: "status",
              children: t.message,
            },
            t.key,
          ),
        ),
      });
}
function yn(e = 3e3) {
  const [t, l] = j.useState(null);
  j.useEffect(() => {
    if (!t) return;
    const u = window.setTimeout(() => l(null), e);
    return () => window.clearTimeout(u);
  }, [e, t]);
  const a = j.useCallback((u) => {
      l(u);
    }, []),
    n = j.useCallback(() => {
      l(null);
    }, []);
  return { message: t, showMessage: a, clearMessage: n };
}
const contentTypeOptions = [
    { label: "전체", value: "ALL" },
    { label: "매뉴얼", value: "MANUAL" },
    { label: "FAQ", value: "FAQ" },
  ],
  contentStatusLabels = { ACTIVE: "정상", FAILED: "실패" },
  Qc = { fileName: "", path: "", type: "MANUAL" },
  allowedFileExtensions = ".pdf,.docx,.txt,.md",
  messageDurationMs = 3e3,
  sortContentDocuments = (e, t) => Bu(e.updatedAt, t.updatedAt) || Bu(e.createdAt, t.createdAt);
function ContentManagementView({ documents: e }) {
  var Z, ue;
  const t = j.useRef(null),
    l = e.slice().sort(sortContentDocuments),
    [a, n] = j.useState({ keyword: "", type: "ALL" }),
    [u, i] = j.useState(""),
    [s, f] = j.useState(() => l),
    [r, b] = j.useState(((Z = l[0]) == null ? void 0 : Z.id) ?? ""),
    [y, h] = j.useState(!1),
    [m, A] = j.useState(!1),
    [N, R] = j.useState("CREATE"),
    [o, d] = j.useState(null),
    v = yn(messageDurationMs),
    g = yn(messageDurationMs),
    [E, C] = j.useState(""),
    [T, D] = j.useState(Qc),
    S = j.useMemo(() => {
      const M = a.keyword.trim().toLowerCase();
      return s
        .filter((X) => {
          const il =
              M.length === 0 ||
              X.name.toLowerCase().includes(M) ||
              X.path.toLowerCase().includes(M),
            Pe = a.type === "ALL" || X.type === a.type;
          return il && Pe;
        })
        .sort(sortContentDocuments);
    }, [a.keyword, a.type, s]),
    _ = S.find((M) => M.id === r) ?? S[0] ?? null,
    te =
      T.fileName.trim().length > 0 &&
      T.path.trim().length > 0 &&
      E.trim().length > 0,
    De = () => {
      n((M) => ({ ...M, keyword: u.trim() }));
    },
    Q = () => {
      (i(""), n((M) => ({ ...M, keyword: "", type: "ALL" })));
    },
    se = () => {
      (R("CREATE"),
        d(null),
        D(Qc),
        C(""),
        g.clearMessage(),
        t.current && (t.current.value = ""),
        h(!0));
    },
    xe = () => {
      _ &&
        (R("EDIT"),
        d(_.id),
        D({ fileName: _.fileName, path: _.path, type: _.type }),
        C(_.fileName),
        g.clearMessage(),
        t.current && (t.current.value = ""),
        h(!0));
    },
    x = () => {
      (h(!1), d(null), C(""), t.current && (t.current.value = ""));
    },
    z = async () => {
      if (!te) {
        g.showMessage("파일과 경로를 모두 입력해 주세요.");
        return;
      }
      const M = await createContentDocument(T),
        X = new Date().toLocaleString("sv-SE").slice(0, 16).replace("T", " ");
      if (N === "CREATE" || !o) {
        const Pe = [
          { ...M, status: "ACTIVE", createdAt: X, updatedAt: X },
          ...s,
        ].sort(sortContentDocuments);
        (f(Pe), b(M.id), v.showMessage("문서 업로드가 완료되었습니다."));
      } else
        (f((il) =>
          il
            .map((Pe) => {
              if (Pe.id !== o) return Pe;
              const Hh = `v${Pe.history.length + 1}`;
              return {
                ...Pe,
                name: M.name,
                fileName: M.fileName,
                path: M.path,
                type: M.type,
                status: "ACTIVE",
                updatedAt: X,
                history: [
                  {
                    id: `hist-${Date.now()}`,
                    version: Hh,
                    actor: "관리자",
                    action: "수정",
                    reason: "기존 문서 수정",
                    occurredAt: X,
                  },
                  ...Pe.history,
                ],
              };
            })
            .sort(sortContentDocuments),
        ),
          b(o),
          v.showMessage("문서가 수정되었습니다."));
      (g.clearMessage(), x(), D(Qc));
    },
    U = () => {
      _ &&
        (f((M) => {
          var il;
          const X = M.filter((Pe) => Pe.id !== _.id).sort(sortContentDocuments);
          return (b(((il = X[0]) == null ? void 0 : il.id) ?? ""), X);
        }),
        A(!1),
        v.showMessage("문서 삭제가 완료되었습니다."));
    },
    $ = () => {
      _ && v.showMessage("문서 다운로드를 준비했습니다.");
    },
    O = (M) => {
      if (!M) {
        (C(""), D((X) => ({ ...X, fileName: "" })));
        return;
      }
      (C(M.name), D((X) => ({ ...X, fileName: M.name })));
    },
    Y = [
      ...(v.message
        ? [{ key: "content-success", tone: "success", message: v.message }]
        : []),
      ...(g.message
        ? [{ key: "content-error", tone: "error", message: g.message }]
        : []),
    ];
  return c.jsxs("div", {
    className: "page-content page-content--fill content-page",
    children: [
      c.jsx(ToastStack, { items: Y }),
      c.jsxs("div", {
        className: "content-grid",
        children: [
          c.jsxs("section", {
            className: "content-table-card",
            children: [
              c.jsx(SectionHeader, {
                title: "문서 목록",
                actions: c.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: se,
                  children: "문서 업로드",
                }),
                className:
                  "content-table-card__header content-table-card__header--list",
              }),
              c.jsxs("form", {
                className:
                  "content-toolbar content-toolbar--content content-table-card__toolbar",
                onSubmit: (M) => {
                  (M.preventDefault(), De());
                },
                children: [
                  c.jsxs("label", {
                    className:
                      "field content-toolbar__field content-toolbar__field--select",
                    children: [
                      c.jsx("span", {
                        className: "field__label",
                        children: "문서 유형",
                      }),
                      c.jsx("select", {
                        className: "field__input",
                        value: a.type,
                        onChange: (M) =>
                          n((X) => ({ ...X, type: M.target.value })),
                        children: contentTypeOptions.map((M) =>
                          c.jsx(
                            "option",
                            { value: M.value, children: M.label },
                            M.value,
                          ),
                        ),
                      }),
                    ],
                  }),
                  c.jsxs("label", {
                    className:
                      "field content-toolbar__field content-toolbar__field--search",
                    children: [
                      c.jsx("span", {
                        className: "field__label",
                        children: "문서명 검색",
                      }),
                      c.jsx("input", {
                        className: "field__input",
                        type: "search",
                        value: u,
                        onChange: (M) => i(M.target.value),
                        placeholder: "2자 이상 입력",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "content-toolbar__actions",
                    children: [
                      c.jsx("button", {
                        type: "submit",
                        className: "primary-button content-toolbar__button",
                        children: "검색",
                      }),
                      c.jsx("button", {
                        type: "button",
                        className: "secondary-button content-toolbar__button",
                        onClick: Q,
                        children: "초기화",
                      }),
                    ],
                  }),
                ],
              }),
              c.jsx("div", {
                className: "content-table-scroll",
                children: c.jsxs("table", {
                  className: "content-table",
                  children: [
                    c.jsx("thead", {
                      children: c.jsxs("tr", {
                        children: [
                          c.jsx("th", { children: "문서명" }),
                          c.jsx("th", { children: "유형" }),
                          c.jsx("th", { children: "등록자" }),
                          c.jsx("th", { children: "등록일" }),
                          c.jsx("th", { children: "수정일" }),
                          c.jsx("th", { children: "상태" }),
                        ],
                      }),
                    }),
                    c.jsx("tbody", {
                      children:
                        S.length === 0
                          ? c.jsx("tr", {
                              children: c.jsx("td", {
                                colSpan: 6,
                                className: "content-empty",
                                children: "조건에 맞는 문서가 없습니다.",
                              }),
                            })
                          : S.map((M) =>
                              c.jsxs(
                                "tr",
                                {
                                  className:
                                    M.id === (_ == null ? void 0 : _.id)
                                      ? "is-selected"
                                      : "",
                                  onClick: () => b(M.id),
                                  children: [
                                    c.jsxs("td", {
                                      children: [
                                        c.jsx("div", {
                                          className: "content-table__title",
                                          children: M.name,
                                        }),
                                        c.jsx("div", {
                                          className: "content-table__sub",
                                          children: M.path,
                                        }),
                                      ],
                                    }),
                                    c.jsx("td", {
                                      children:
                                        M.type === "MANUAL" ? "매뉴얼" : "FAQ",
                                    }),
                                    c.jsx("td", { children: M.author }),
                                    c.jsx("td", { children: M.createdAt }),
                                    c.jsx("td", { children: M.updatedAt }),
                                    c.jsx("td", {
                                      children: c.jsx("span", {
                                        className: `status-badge status-badge--${M.status.toLowerCase()}`,
                                        children: contentStatusLabels[M.status],
                                      }),
                                    }),
                                  ],
                                },
                                M.id,
                              ),
                            ),
                    }),
                  ],
                }),
              }),
            ],
          }),
          c.jsx(DetailFrame, {
            className: "content-detail-card",
            title: "문서 상세",
            actions: _
              ? c.jsx("span", {
                  className: `status-badge status-badge--${_.status.toLowerCase()}`,
                  children: contentStatusLabels[_.status],
                })
              : null,
            children: _
              ? c.jsxs("div", {
                  className: "content-detail-scroll",
                  children: [
                    c.jsx("div", {
                      className: "content-detail__name-card",
                      children: c.jsxs("div", {
                        className: "content-detail__identity",
                        children: [
                          c.jsx("h3", {
                            className: "content-detail__title",
                            children: _.name,
                          }),
                          c.jsx("span", {
                            className: "content-detail__type-pill",
                            children: _.type === "MANUAL" ? "매뉴얼" : "FAQ",
                          }),
                        ],
                      }),
                    }),
                    c.jsxs("dl", {
                      className: "content-detail__list",
                      children: [
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "저장 경로" }),
                            c.jsx("dd", { children: _.path }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "파일 크기" }),
                            c.jsx("dd", { children: _.fileSize }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "등록자" }),
                            c.jsx("dd", { children: _.author }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "등록일" }),
                            c.jsx("dd", { children: _.createdAt }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "수정자" }),
                            c.jsx("dd", {
                              children:
                                ((ue = _.history[0]) == null
                                  ? void 0
                                  : ue.actor) ?? _.author,
                            }),
                          ],
                        }),
                        c.jsxs("div", {
                          children: [
                            c.jsx("dt", { children: "수정일" }),
                            c.jsx("dd", { children: _.updatedAt }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "content-detail-actions",
                      children: [
                        c.jsx("button", {
                          type: "button",
                          className: "secondary-button",
                          onClick: $,
                          children: "다운로드",
                        }),
                        c.jsx("button", {
                          type: "button",
                          className: "secondary-button",
                          onClick: xe,
                          children: "수정",
                        }),
                        c.jsx("button", {
                          type: "button",
                          className: "danger-button",
                          onClick: () => A(!0),
                          children: "삭제",
                        }),
                      ],
                    }),
                    c.jsxs("section", {
                      className: "content-history",
                      children: [
                        c.jsx("h4", { children: "변경 이력" }),
                        c.jsx("ul", {
                          children: _.history.map((M) =>
                            c.jsxs(
                              "li",
                              {
                                children: [
                                  c.jsx("strong", { children: M.version }),
                                  c.jsxs("span", {
                                    children: [
                                      M.actor,
                                      " · ",
                                      M.action,
                                      " · ",
                                      M.occurredAt,
                                    ],
                                  }),
                                  c.jsx("p", { children: M.reason }),
                                ],
                              },
                              M.id,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                })
              : c.jsx("div", {
                  className: "content-empty content-empty--detail",
                  children: "선택한 문서가 없습니다.",
                }),
          }),
        ],
      }),
      y
        ? c.jsxs(nl, {
            title: N === "EDIT" ? "문서 수정 업로드" : "문서 업로드",
            ariaLabel: N === "EDIT" ? "문서 수정 업로드" : "문서 업로드",
            onClose: x,
            size: "lg",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: x,
                  children: "취소",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: z,
                  disabled: !te,
                  children: N === "EDIT" ? "수정 저장" : "저장",
                }),
              ],
            }),
            children: [
              c.jsxs("label", {
                className: "field",
                children: [
                  c.jsx("span", {
                    className: "field__label",
                    children: "파일 선택 *",
                  }),
                  c.jsx("input", {
                    ref: t,
                    className: "field__input content-file-input",
                    type: "file",
                    accept: allowedFileExtensions,
                    onChange: (M) => {
                      var X;
                      return O((X = M.target.files) == null ? void 0 : X[0]);
                    },
                  }),
                  c.jsx("span", {
                    className: "content-file-name",
                    children: E ? `선택한 파일: ${E}` : "파일을 선택해 주세요.",
                  }),
                ],
              }),
              c.jsxs("label", {
                className: "field",
                children: [
                  c.jsx("span", {
                    className: "field__label",
                    children: "저장 경로",
                  }),
                  c.jsx("input", {
                    className: "field__input",
                    value: T.path,
                    onChange: (M) => D((X) => ({ ...X, path: M.target.value })),
                    placeholder: "/rag/manual/chatbot-guide",
                  }),
                ],
              }),
              c.jsxs("label", {
                className: "field",
                children: [
                  c.jsx("span", {
                    className: "field__label",
                    children: "문서 유형",
                  }),
                  c.jsxs("select", {
                    className: "field__input",
                    value: T.type,
                    onChange: (M) => D((X) => ({ ...X, type: M.target.value })),
                    children: [
                      c.jsx("option", { value: "MANUAL", children: "매뉴얼" }),
                      c.jsx("option", { value: "FAQ", children: "FAQ" }),
                    ],
                  }),
                ],
              }),
            ],
          })
        : null,
      m
        ? c.jsx(nl, {
            title: "문서 삭제 확인",
            ariaLabel: "문서 삭제 확인",
            onClose: () => A(!1),
            size: "sm",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => A(!1),
                  children: "취소",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: U,
                  children: "삭제",
                }),
              ],
            }),
            children: c.jsx("p", {
              className: "content-confirm",
              children:
                "문서를 삭제하면 목록에서 사라집니다. 복구 작업은 별도로 제공되지 않습니다.",
            }),
          })
        : null,
    ],
  });
}
function ListPanel({
  title: e,
  actions: t,
  toolbar: l,
  footer: a,
  className: n,
  children: u,
}) {
  return c.jsxs("section", {
    className: `list-panel${n ? ` ${n}` : ""}`,
    children: [
      c.jsx(SectionHeader, { title: e, actions: t, className: "list-panel__header" }),
      l
        ? c.jsx("div", { className: "list-panel__toolbar", children: l })
        : null,
      c.jsx("div", { className: "list-panel__body", children: u }),
      a ? c.jsx("div", { className: "list-panel__footer", children: a }) : null,
    ],
  });
}
function ny(e, t) {
  if (t <= 7) return Array.from({ length: t }, (u, i) => i + 1);
  const l = [1];
  e > 4 && l.push(null);
  const a = Math.max(2, e - 1),
    n = Math.min(t - 1, e + 1);
  for (let u = a; u <= n; u += 1) l.push(u);
  return (e < t - 3 && l.push(null), l.push(t), l);
}
function Pagination({ page: e, totalPages: t, onChange: l }) {
  const a = Math.max(1, t),
    n = Math.min(Math.max(e, 1), a),
    u = ny(n, a);
  return c.jsxs("nav", {
    className: "pagination",
    "aria-label": "페이지네이션",
    children: [
      c.jsx("button", {
        type: "button",
        className: "pagination__button",
        disabled: n === 1,
        onClick: () => l(n - 1),
        children: "이전",
      }),
      u.map((i, s) =>
        i === null
          ? c.jsx(
              "span",
              {
                className: "pagination__ellipsis",
                "aria-hidden": "true",
                children: "...",
              },
              `ellipsis-${s}`,
            )
          : c.jsx(
              "button",
              {
                type: "button",
                className: `pagination__button${n === i ? " is-active" : ""}`,
                "aria-current": n === i ? "page" : void 0,
                onClick: () => l(i),
                children: i,
              },
              i,
            ),
      ),
      c.jsx("button", {
        type: "button",
        className: "pagination__button",
        disabled: n === a,
        onClick: () => l(n + 1),
        children: "다음",
      }),
    ],
  });
}
const Ys = () =>
    new Date().toLocaleString("sv-SE").slice(0, 16).replace("T", " "),
  cacheQaRecords = [
    {
      id: "cache-001",
      question: "배송은 언제 도착하나요?",
      answer:
        "일반 배송은 결제 완료 후 2~3영업일 내 도착합니다. 지역과 상품에 따라 차이가 있습니다.",
      status: "ACTIVE",
      createdAt: "2026-04-01 09:10",
      updatedAt: "2026-04-02 11:40",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 182,
      lastMatchedAt: "2026-04-03 09:18",
    },
    {
      id: "cache-002",
      question: "주문을 취소하고 싶어요",
      answer:
        "배송 전 주문은 마이페이지에서 직접 취소할 수 있습니다. 배송 후에는 반품 절차로 진행됩니다.",
      status: "ACTIVE",
      createdAt: "2026-04-01 10:22",
      updatedAt: "2026-04-03 08:12",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 145,
      lastMatchedAt: "2026-04-03 09:40",
    },
    {
      id: "cache-003",
      question: "비밀번호를 재설정하려면 어떻게 하나요?",
      answer:
        "로그인 화면의 비밀번호 찾기 버튼을 눌러 등록된 이메일 또는 휴대폰 인증 후 재설정할 수 있습니다.",
      status: "ACTIVE",
      createdAt: "2026-04-01 13:05",
      updatedAt: "2026-04-02 15:55",
      createdBy: "운영팀",
      updatedBy: "운영팀",
      hitCount: 96,
      lastMatchedAt: "2026-04-03 08:05",
    },
    {
      id: "cache-004",
      question: "환불은 얼마나 걸리나요?",
      answer: "환불 승인 후 카드사 및 결제수단에 따라 3~7영업일이 소요됩니다.",
      status: "ACTIVE",
      createdAt: "2026-04-01 15:18",
      updatedAt: "2026-04-01 15:18",
      createdBy: "운영팀",
      updatedBy: "운영팀",
      hitCount: 74,
      lastMatchedAt: "2026-04-03 07:55",
    },
    {
      id: "cache-005",
      question: "회원 탈퇴는 어디서 하나요?",
      answer:
        "마이페이지 > 계정 설정 > 회원 탈퇴에서 진행할 수 있습니다. 탈퇴 후 복구는 불가합니다.",
      status: "INACTIVE",
      createdAt: "2026-03-30 11:30",
      updatedAt: "2026-04-02 10:30",
      createdBy: "관리자",
      updatedBy: "운영팀",
      hitCount: 61,
      lastMatchedAt: "2026-04-02 14:20",
    },
    {
      id: "cache-006",
      question: "영수증을 다시 받을 수 있나요?",
      answer:
        "주문 상세 화면에서 영수증 재발급을 눌러 이메일로 다시 받을 수 있습니다.",
      status: "ACTIVE",
      createdAt: "2026-03-29 09:45",
      updatedAt: "2026-04-02 09:10",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 53,
      lastMatchedAt: "2026-04-03 07:12",
    },
    {
      id: "cache-007",
      question: "쿠폰은 어디서 적용하나요?",
      answer:
        "결제 단계의 쿠폰 입력란에서 보유 쿠폰을 선택하거나 쿠폰 코드를 입력할 수 있습니다.",
      status: "ACTIVE",
      createdAt: "2026-03-28 16:00",
      updatedAt: "2026-04-02 12:00",
      createdBy: "운영팀",
      updatedBy: "운영팀",
      hitCount: 117,
      lastMatchedAt: "2026-04-03 06:58",
    },
    {
      id: "cache-008",
      question: "주문 조회가 안 돼요",
      answer:
        "주문 번호와 연락처가 일치하는지 확인해 주세요. 그래도 조회되지 않으면 고객센터에 문의해 주세요.",
      status: "ACTIVE",
      createdAt: "2026-03-28 18:20",
      updatedAt: "2026-04-01 16:05",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 88,
      lastMatchedAt: "2026-04-03 09:00",
    },
    {
      id: "cache-009",
      question: "배송 주소를 수정하고 싶어요",
      answer:
        "결제 완료 직후에는 주문 상세에서 주소 수정이 가능하며, 출고 이후에는 수정이 불가합니다.",
      status: "INACTIVE",
      createdAt: "2026-03-27 14:12",
      updatedAt: "2026-04-01 13:55",
      createdBy: "운영팀",
      updatedBy: "운영팀",
      hitCount: 34,
      lastMatchedAt: "2026-04-01 14:05",
    },
    {
      id: "cache-010",
      question: "결제 수단을 변경할 수 있나요?",
      answer:
        "결제 완료 전에는 수단 변경이 가능하며, 이미 결제된 주문은 취소 후 재주문해야 합니다.",
      status: "ACTIVE",
      createdAt: "2026-03-27 09:40",
      updatedAt: "2026-04-02 17:25",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 69,
      lastMatchedAt: "2026-04-03 08:45",
    },
    {
      id: "cache-011",
      question: "환불 계좌 정보는 어디서 확인하나요?",
      answer:
        "환불 신청 화면에서 등록된 환불 계좌를 확인할 수 있으며, 필요 시 변경 가능합니다.",
      status: "ACTIVE",
      createdAt: "2026-03-26 11:10",
      updatedAt: "2026-04-03 09:05",
      createdBy: "운영팀",
      updatedBy: "관리자",
      hitCount: 41,
      lastMatchedAt: "2026-04-03 09:12",
    },
    {
      id: "cache-012",
      question: "상품 교환은 어떻게 진행되나요?",
      answer:
        "교환 사유를 접수한 후 회수 및 재발송 절차로 진행되며, 상품 상태에 따라 승인 여부가 달라집니다.",
      status: "INACTIVE",
      createdAt: "2026-03-25 15:35",
      updatedAt: "2026-04-01 18:10",
      createdBy: "관리자",
      updatedBy: "관리자",
      hitCount: 27,
      lastMatchedAt: null,
    },
  ],
  Il = (e) =>
    e
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^0-9a-z가-힣]/gi, ""),
  iy = (e, t) => {
    const l = Il(e),
      a = Il(t);
    if (!l && !a) return 1;
    if (!l || !a) return 0;
    if (l === a) return 1;
    const n = Array.from({ length: l.length + 1 }, (i, s) =>
      Array.from({ length: a.length + 1 }, (f, r) =>
        s === 0 ? r : r === 0 ? s : 0,
      ),
    );
    for (let i = 1; i <= l.length; i += 1)
      for (let s = 1; s <= a.length; s += 1) {
        const f = l[i - 1] === a[s - 1] ? 0 : 1;
        n[i][s] = Math.min(
          n[i - 1][s] + 1,
          n[i][s - 1] + 1,
          n[i - 1][s - 1] + f,
        );
      }
    return 1 - n[l.length][a.length] / Math.max(l.length, a.length);
  },
  findCacheQaDuplicate = (e, t, l) => {
    let n = null;
    for (const u of e) {
      if (l && u.id === l) continue;
      const i = Math.max(
        iy(u.question, t),
        Il(u.question).includes(Il(t)) ? 0.92 : 0,
        Il(t).includes(Il(u.question)) ? 0.92 : 0,
      );
      i >= 0.85 && (!n || i > n.score) && (n = { item: u, score: i });
    }
    return n;
  },
  createCacheQaEntry = async (e, t = "관리자") => {
    const l = Ys();
    return {
      id: `cache-${Date.now()}`,
      question: e.question.trim(),
      answer: e.answer.trim(),
      status: e.status,
      createdAt: l,
      updatedAt: l,
      createdBy: t,
      updatedBy: t,
      hitCount: 0,
      lastMatchedAt: null,
    };
  },
  updateCacheQaEntry = async (e, t, l = "관리자") => {
    const a = Ys();
    return {
      ...e,
      question: t.question.trim(),
      answer: t.answer.trim(),
      status: t.status,
      updatedAt: a,
      updatedBy: l,
    };
  },
  toggleCacheQaEntryStatus = async (e, t, l = "관리자") => {
    const a = Ys();
    return { ...e, status: t, updatedAt: a, updatedBy: l };
  },
  Gc = 10,
  Sr = 500,
  Ar = 2e3,
  xr = 3e3,
  Er = { ACTIVE: "활성", INACTIVE: "비활성" },
  dy = [
    { label: "전체", value: "ALL" },
    { label: "활성", value: "ACTIVE" },
    { label: "비활성", value: "INACTIVE" },
  ],
  Hl = { question: "", answer: "", status: "ACTIVE" },
  ql = (e, t) => Bu(e.createdAt, t.createdAt);
function CacheAnswerManagementView({ items: e }) {
  var $;
  const [t, l] = j.useState(e.slice().sort(ql)),
    [a, n] = j.useState({ keyword: "", status: "ALL" }),
    [u, i] = j.useState(""),
    [s, f] = j.useState((($ = e[0]) == null ? void 0 : $.id) ?? null),
    [r, b] = j.useState(1),
    [y, h] = j.useState(!1),
    [m, A] = j.useState("CREATE"),
    [N, R] = j.useState(null),
    [o, d] = j.useState(Hl),
    v = yn(xr),
    g = yn(xr),
    [E, C] = j.useState(!1),
    T = j.useMemo(() => {
      const O = mr(a.keyword);
      return t
        .map((Y) => {
          const Z = mr(Y.question),
            ue = O.length === 0 || Z.includes(O) || O.includes(Z),
            M =
              O.length === 0
                ? 1
                : Math.max(
                    Z === O
                      ? 1
                      : 1 -
                          Math.abs(Z.length - O.length) /
                            Math.max(Z.length, O.length, 1),
                    Z.includes(O) ? 0.92 : 0,
                    O.includes(Z) ? 0.92 : 0,
                  );
          return { item: Y, score: M, exactMatch: ue };
        })
        .filter(({ item: Y, score: Z, exactMatch: ue }) => {
          const M = a.status === "ALL" || Y.status === a.status,
            X = O.length === 0 ? !0 : ue || Z >= 0.35;
          return M && X;
        })
        .sort((Y, Z) =>
          O.length > 0 && Z.score !== Y.score
            ? Z.score - Y.score
            : ql(Y.item, Z.item),
        )
        .map(({ item: Y }) => Y);
    }, [a.keyword, a.status, t]),
    D = Math.max(1, Math.ceil(T.length / Gc)),
    S = T.slice((r - 1) * Gc, r * Gc),
    _ = T.find((O) => O.id === s) ?? null;
  (j.useEffect(() => {
    b((O) => Math.min(O, D));
  }, [D]),
    j.useEffect(() => {
      if (T.length === 0) {
        f(null);
        return;
      }
      (!s || !T.some((O) => O.id === s)) && f(T[0].id);
    }, [T, s]));
  const te = () => {
      (A("CREATE"), R(null), d(Hl), g.clearMessage(), h(!0));
    },
    De = () => {
      _ &&
        (A("EDIT"),
        R(_.id),
        d({ question: _.question, answer: _.answer, status: _.status }),
        g.clearMessage(),
        h(!0));
    },
    Q = () => {
      (h(!1), g.clearMessage());
    },
    se = () => {
      (i(""), n((O) => ({ ...O, keyword: "" })), b(1));
    },
    xe = () => {
      (n((O) => ({ ...O, keyword: u.trim() })), b(1));
    },
    x = async () => {
      if (!o.question.trim() || !o.answer.trim()) {
        g.showMessage("질문과 답변을 모두 입력해 주세요.");
        return;
      }
      if (findCacheQaDuplicate(t, o.question.trim(), N ?? void 0)) {
        g.showMessage("유사한 질문이 이미 등록되어 있습니다.");
        return;
      }
      if (m === "CREATE") {
        const ue = await createCacheQaEntry(o);
        (l((M) => [ue, ...M].sort(ql)),
          f(ue.id),
          v.showMessage("답변이 등록되었습니다."),
          d(Hl),
          Q());
        return;
      }
      if (!N) {
        g.showMessage("수정할 항목을 선택해 주세요.");
        return;
      }
      const Y = t.find((ue) => ue.id === N);
      if (!Y) {
        g.showMessage("수정 대상이 존재하지 않습니다.");
        return;
      }
      const Z = await updateCacheQaEntry(Y, o);
      (l((ue) => ue.map((M) => (M.id === N ? Z : M)).sort(ql)),
        f(Z.id),
        v.showMessage("답변이 수정되었습니다."),
        d(Hl),
        A("CREATE"),
        R(null),
        Q());
    },
    z = async () => {
      if (!_) return;
      const O = _.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
        Y = await toggleCacheQaEntryStatus(_, O);
      (l((Z) => Z.map((ue) => (ue.id === Y.id ? Y : ue)).sort(ql)),
        f(Y.id),
        v.showMessage(
          O === "ACTIVE"
            ? "답변이 활성화되었습니다."
            : "답변이 비활성화되었습니다.",
        ));
    },
    U = () => {
      _ &&
        (l((O) => {
          var Z;
          const Y = O.filter((ue) => ue.id !== _.id).sort(ql);
          return (f(((Z = Y[0]) == null ? void 0 : Z.id) ?? null), Y);
        }),
        C(!1),
        v.showMessage("답변이 삭제되었습니다."),
        A("CREATE"),
        R(null),
        d(Hl));
    };
  return c.jsxs("div", {
    className: "cache-qa-layout",
    children: [
      c.jsx(ToastStack, {
        items: [
          v.message
            ? { key: "cache-qa-success", tone: "success", message: v.message }
            : null,
          g.message
            ? { key: "cache-qa-error", tone: "error", message: g.message }
            : null,
        ].filter((O) => !!O),
      }),
      c.jsxs("div", {
        className: "cache-qa-grid",
        children: [
          c.jsx(ListPanel, {
            className: "cache-qa-list-card",
            title: "캐시 답변 목록",
            actions: c.jsx("button", {
              type: "button",
              className: "primary-button",
              onClick: te,
              children: "캐시 답변 등록",
            }),
            toolbar: c.jsxs("form", {
              className: "cache-qa-toolbar",
              onSubmit: (O) => {
                (O.preventDefault(), xe());
              },
              children: [
                c.jsxs("label", {
                  className: "field cache-qa-field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "질문 검색",
                    }),
                    c.jsx("input", {
                      className: "field__input",
                      type: "search",
                      placeholder: "2자 이상 입력 권장",
                      value: u,
                      onChange: (O) => i(O.target.value),
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field cache-qa-field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "상태",
                    }),
                    c.jsx("select", {
                      className: "field__input",
                      value: a.status,
                      onChange: (O) => {
                        (n((Y) => ({ ...Y, status: O.target.value })), b(1));
                      },
                      children: dy.map((O) =>
                        c.jsx(
                          "option",
                          { value: O.value, children: O.label },
                          O.value,
                        ),
                      ),
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "cache-qa-toolbar__actions",
                  children: [
                    c.jsx("button", {
                      type: "submit",
                      className: "primary-button",
                      children: "검색",
                    }),
                    c.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      onClick: se,
                      children: "초기화",
                    }),
                  ],
                }),
              ],
            }),
            footer: c.jsx(Pagination, { page: r, totalPages: D, onChange: b }),
            children: c.jsx("div", {
              className: "list-panel__scroll cache-qa-list-scroll",
              children:
                S.length === 0
                  ? c.jsx("div", {
                      className: "list-panel__empty",
                      children: "조건에 맞는 답변이 없습니다.",
                    })
                  : c.jsxs("table", {
                      className: "content-table cache-qa-table",
                      children: [
                        c.jsx("thead", {
                          children: c.jsxs("tr", {
                            children: [
                              c.jsx("th", { children: "질문" }),
                              c.jsx("th", { children: "상태" }),
                              c.jsx("th", { children: "등록일" }),
                              c.jsx("th", { children: "수정일" }),
                            ],
                          }),
                        }),
                        c.jsx("tbody", {
                          children: S.map((O) =>
                            c.jsxs(
                              "tr",
                              {
                                className:
                                  O.id === (_ == null ? void 0 : _.id)
                                    ? "is-selected"
                                    : "",
                                onClick: () => f(O.id),
                                children: [
                                  c.jsx("td", {
                                    children: c.jsx("div", {
                                      className: "content-table__title",
                                      children: O.question,
                                    }),
                                  }),
                                  c.jsx("td", {
                                    children: c.jsx("span", {
                                      className: `status-badge status-badge--${O.status.toLowerCase()}`,
                                      children: Er[O.status],
                                    }),
                                  }),
                                  c.jsx("td", { children: O.createdAt }),
                                  c.jsx("td", { children: O.updatedAt }),
                                ],
                              },
                              O.id,
                            ),
                          ),
                        }),
                      ],
                    }),
            }),
          }),
          c.jsx("aside", {
            className: "cache-qa-side",
            children: c.jsx(DetailFrame, {
              className: "cache-qa-detail-card",
              title: "상세 정보",
              actions: _
                ? c.jsx("span", {
                    className: `status-badge status-badge--${_.status.toLowerCase()}`,
                    children: Er[_.status],
                  })
                : null,
              children: _
                ? c.jsxs("div", {
                    className: "cache-qa-detail-scroll",
                    children: [
                      c.jsxs("div", {
                        className: "feedback-conversation-section",
                        children: [
                          c.jsx("p", {
                            className: "feedback-conversation-label",
                            children: "대화 내용",
                          }),
                          c.jsxs("div", {
                            className: "cache-qa-conversation",
                            children: [
                              c.jsxs("div", {
                                className:
                                  "feedback-conversation__turn feedback-conversation__turn--user",
                                children: [
                                  c.jsx("p", {
                                    className: "feedback-conversation__speaker",
                                    children: "질문",
                                  }),
                                  c.jsx("p", {
                                    className: "feedback-conversation__message",
                                    children: _.question,
                                  }),
                                ],
                              }),
                              c.jsxs("div", {
                                className:
                                  "feedback-conversation__turn feedback-conversation__turn--bot",
                                children: [
                                  c.jsx("p", {
                                    className: "feedback-conversation__speaker",
                                    children: "답변",
                                  }),
                                  c.jsx("p", {
                                    className: "feedback-conversation__message",
                                    children: _.answer,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("dl", {
                        className: "content-detail__list cache-qa-meta",
                        children: [
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "등록자" }),
                              c.jsx("dd", { children: _.createdBy }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "등록일" }),
                              c.jsx("dd", { children: _.createdAt }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "수정자" }),
                              c.jsx("dd", { children: _.updatedBy }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "수정일" }),
                              c.jsx("dd", { children: _.updatedAt }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "캐시 조회 수" }),
                              c.jsx("dd", {
                                children: _.hitCount.toLocaleString(),
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "cache-qa-detail-actions",
                        children: [
                          c.jsx("button", {
                            type: "button",
                            className: "secondary-button",
                            onClick: De,
                            children: "수정",
                          }),
                          c.jsx("button", {
                            type: "button",
                            className: "primary-button",
                            onClick: z,
                            disabled: !_,
                            children:
                              _.status === "ACTIVE" ? "비활성화" : "활성화",
                          }),
                          c.jsx("button", {
                            type: "button",
                            className: "danger-button",
                            onClick: () => C(!0),
                            children: "삭제",
                          }),
                        ],
                      }),
                    ],
                  })
                : c.jsx("div", {
                    className: "list-panel__empty cache-qa-empty",
                    children: "답변을 선택하면 상세 정보가 표시됩니다.",
                  }),
            }),
          }),
        ],
      }),
      y
        ? c.jsx(nl, {
            title: m === "EDIT" ? "캐시 답변 수정" : "캐시 답변 등록",
            ariaLabel: m === "EDIT" ? "캐시 답변 수정" : "캐시 답변 등록",
            onClose: Q,
            size: "xl",
            footerClassName: "modal__footer--split",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => {
                    (Q(), d(Hl), A("CREATE"), R(null));
                  },
                  children: "초기화",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: x,
                  children: m === "EDIT" ? "수정 저장" : "등록",
                }),
              ],
            }),
            children: c.jsxs("div", {
              className: "cache-qa-form cache-qa-form--modal",
              children: [
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "질문 *",
                    }),
                    c.jsx("textarea", {
                      className:
                        "field__input knowledge-textarea cache-qa-textarea",
                      rows: 3,
                      maxLength: Sr,
                      value: o.question,
                      placeholder: "캐시 답변용 질문을 입력해 주세요.",
                      onChange: (O) =>
                        d((Y) => ({ ...Y, question: O.target.value })),
                    }),
                    c.jsxs("p", {
                      className: "cache-qa-form__counter",
                      children: [o.question.length, "/", Sr, "자"],
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "답변 *",
                    }),
                    c.jsx("textarea", {
                      className:
                        "field__input knowledge-textarea cache-qa-textarea",
                      rows: 6,
                      maxLength: Ar,
                      value: o.answer,
                      placeholder: "캐시 답변으로 반환할 답변을 입력해 주세요.",
                      onChange: (O) =>
                        d((Y) => ({ ...Y, answer: O.target.value })),
                    }),
                    c.jsxs("p", {
                      className: "cache-qa-form__counter",
                      children: [o.answer.length, "/", Ar, "자"],
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "상태",
                    }),
                    c.jsxs("select", {
                      className: "field__input",
                      value: o.status,
                      onChange: (O) =>
                        d((Y) => ({ ...Y, status: O.target.value })),
                      children: [
                        c.jsx("option", { value: "ACTIVE", children: "활성" }),
                        c.jsx("option", {
                          value: "INACTIVE",
                          children: "비활성",
                        }),
                      ],
                    }),
                  ],
                }),
                g.message
                  ? c.jsx("p", {
                      className: "content-error",
                      children: g.message,
                    })
                  : null,
              ],
            }),
          })
        : null,
      E
        ? c.jsx(nl, {
            title: "캐시 답변 삭제 확인",
            ariaLabel: "캐시 답변 삭제 확인",
            onClose: () => C(!1),
            size: "sm",
            compact: !0,
            footerClassName: "modal__footer--split",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => C(!1),
                  children: "취소",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: U,
                  children: "삭제",
                }),
              ],
            }),
            children: c.jsx("p", {
              className: "content-confirm",
              children: "선택한 답변을 삭제하면 캐시 답변에서 즉시 제외됩니다.",
            }),
          })
        : null,
    ],
  });
}
const knowledgeDocuments = [
  {
    id: "kdoc-001",
    name: "챗봇 운영 매뉴얼",
    type: "MANUAL",
    path: "/rag/manual/chatbot-operations",
  },
  {
    id: "kdoc-002",
    name: "업무 안내서",
    type: "MANUAL",
    path: "/rag/manual/payment-guide",
  },
  {
    id: "kdoc-003",
    name: "FAQ 모음",
    type: "FAQ",
    path: "/rag/faq/common-questions",
  },
  {
    id: "kdoc-004",
    name: "차량등록 FAQ",
    type: "FAQ",
    path: "/rag/faq/vehicle-registration",
  },
];
async function loadKnowledgeDocuments() {
  return { documents: knowledgeDocuments };
}
async function executeKnowledgeQuery(e) {
  const t = knowledgeDocuments.find((l) => l.id === e.documentId);
  return t
    ? {
        answer: `"${e.question}"에 대한 응답입니다.선택하신 문서(${t.name})를 기반으로 관련 내용을 조회한 결과, 해당 내용에 대한 예시 응답을 생성했습니다. 실제 API 연동 시에는 정확한 문맥을 기준으로 응답합니다.`,
        generatedAt: "2026-04-02 10:30:00",
        referenceDocument: { name: t.name, type: t.type, path: t.path },
        referenceParagraph: "chunk-042",
      }
    : null;
}
function KnowledgeQueryView({ documents: e }) {
  const [t, l] = j.useState({ question: "", documentType: "", documentId: "" }),
    [a, n] = j.useState("IDLE"),
    [u, i] = j.useState(null),
    [s, f] = j.useState(!1),
    r = j.useMemo(
      () => (t.documentType ? e.filter((o) => o.type === t.documentType) : e),
      [t.documentType, e],
    ),
    b = t.question.length >= 1 && t.documentType !== "" && t.documentId !== "",
    y = a !== "IDLE",
    h = (o) => {
      l({ ...t, documentType: o, documentId: "" });
    },
    m = async () => {
      (n("LOADING"), i(null));
      try {
        const o = await executeKnowledgeQuery(t);
        (n(o ? "SUCCESS" : "EMPTY"), o && i(o));
      } catch {
        n("ERROR");
      }
    },
    A = () => {
      (n("ERROR"), i(null), f(!1));
    },
    N = () => {
      (l({ question: "", documentType: "", documentId: "" }),
        n("IDLE"),
        i(null),
        f(!1));
    },
    R = () => {
      u &&
        navigator.clipboard.writeText(u.answer).then(() => {
          (f(!0), setTimeout(() => f(!1), 2e3));
        });
    };
  return c.jsx("div", {
    className: "knowledge-layout",
    children: c.jsxs("div", {
      className: "knowledge-grid",
      children: [
        c.jsxs("section", {
          className: "panel panel--main",
          children: [
            c.jsx(SectionHeader, { title: "조회 조건" }),
            c.jsxs("div", {
              className: "knowledge-form",
              children: [
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "문서 유형 *",
                    }),
                    c.jsxs("select", {
                      className: "field__input",
                      value: t.documentType,
                      onChange: (o) => h(o.target.value),
                      children: [
                        c.jsx("option", { value: "", children: "선택하세요" }),
                        c.jsx("option", {
                          value: "MANUAL",
                          children: "매뉴얼",
                        }),
                        c.jsx("option", { value: "FAQ", children: "FAQ" }),
                      ],
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "테스트 문서 *",
                    }),
                    c.jsxs("select", {
                      className: "field__input",
                      value: t.documentId,
                      disabled: !t.documentType,
                      onChange: (o) => l({ ...t, documentId: o.target.value }),
                      children: [
                        c.jsx("option", { value: "", children: "선택하세요" }),
                        r.map((o) =>
                          c.jsx(
                            "option",
                            { value: o.id, children: o.name },
                            o.id,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
                c.jsxs("label", {
                  className: "field",
                  children: [
                    c.jsx("span", {
                      className: "field__label",
                      children: "질문 입력 *",
                    }),
                    c.jsx("textarea", {
                      className: "field__input knowledge-textarea",
                      value: t.question,
                      maxLength: 1e3,
                      rows: 4,
                      placeholder: "1자 이상 입력 (최대 1000자)",
                      onChange: (o) => l({ ...t, question: o.target.value }),
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "knowledge-action-row",
                  children: [
                    c.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      disabled: !y,
                      onClick: N,
                      children: "초기화",
                    }),
                    c.jsx("button", {
                      type: "button",
                      className: "primary-button",
                      disabled: !b || a === "LOADING",
                      onClick: m,
                      children: a === "LOADING" ? "조회 중" : "조회",
                    }),
                    c.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      onClick: A,
                      children: "오류 보기",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        c.jsxs(DetailFrame, {
          className: "panel panel--main",
          title: "조회 결과",
          children: [
            a === "IDLE" &&
              c.jsx("div", {
                className: "knowledge-result-empty",
                children: "조건을 입력한 뒤 조회를 시작해 주세요.",
              }),
            a === "LOADING" &&
              c.jsx("div", {
                className: "knowledge-result-empty",
                children: "조회 중입니다.",
              }),
            a === "EMPTY" &&
              c.jsx("div", {
                className: "knowledge-result-empty",
                children: "선택한 문서에서 일치하는 답변을 찾지 못했습니다.",
              }),
            a === "ERROR" &&
              c.jsx("div", {
                className: "knowledge-result-empty",
                children: "조회에 실패했습니다. 다시 시도해 주세요.",
              }),
            a === "SUCCESS" &&
              u &&
              c.jsxs("div", {
                className: "knowledge-result-scroll",
                children: [
                  c.jsxs("div", {
                    className: "knowledge-answer",
                    children: [
                      c.jsx("p", {
                        className: "knowledge-answer__text",
                        children: u.answer,
                      }),
                      c.jsxs("p", {
                        className: "knowledge-answer__meta",
                        children: ["생성 시각: ", u.generatedAt],
                      }),
                    ],
                  }),
                  c.jsxs("dl", {
                    className: "content-detail__list knowledge-reference",
                    children: [
                      c.jsxs("div", {
                        children: [
                          c.jsx("dt", { children: "참조 문서" }),
                          c.jsxs("dd", {
                            children: [
                              u.referenceDocument.name,
                              c.jsx("span", {
                                className: "knowledge-ref-type",
                                children:
                                  u.referenceDocument.type === "MANUAL"
                                    ? "매뉴얼"
                                    : "FAQ",
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        children: [
                          c.jsx("dt", { children: "저장 경로" }),
                          c.jsx("dd", { children: u.referenceDocument.path }),
                        ],
                      }),
                      c.jsxs("div", {
                        children: [
                          c.jsx("dt", { children: "참조 단락" }),
                          c.jsx("dd", { children: u.referenceParagraph }),
                        ],
                      }),
                    ],
                  }),
                  c.jsx("div", {
                    className: "knowledge-footer",
                    children: c.jsx("button", {
                      type: "button",
                      className: "secondary-button",
                      onClick: R,
                      children: s ? "복사 완료" : "결과 복사",
                    }),
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
const feedbackReactionLabels = { POSITIVE: "긍정", NEGATIVE: "부정" },
  by = [
    { label: "전체", value: "ALL" },
    { label: "긍정", value: "POSITIVE" },
    { label: "부정", value: "NEGATIVE" },
  ],
  Xc = (e) => new Date(e.replace(" ", "T")),
  gy = (e) => `${e}T00:00:00`,
  py = (e) => `${e}T23:59:59.999`,
  _y = (e, t) => {
    if (!t.startDate && !t.endDate) return !0;
    const l = Xc(e).getTime(),
      a = t.startDate ? Xc(gy(t.startDate)).getTime() : null,
      n = t.endDate ? Xc(py(t.endDate)).getTime() : null;
    return a !== null && n !== null && a > n
      ? l >= n && l <= a
      : !((a !== null && l < a) || (n !== null && l > n));
  },
  Sy = (e, t) => Bu(e.createdAt, t.createdAt);
function FeedbackManagementView({ feedbacks: e }) {
  const [t, l] = j.useState({ reaction: "ALL" }),
    [a, n] = j.useState({ startDate: "", endDate: "" }),
    [u, i] = j.useState({ startDate: "", endDate: "" }),
    [s, f] = j.useState(null),
    r = j.useMemo(
      () =>
        e
          .filter((m) => t.reaction === "ALL" || m.reaction === t.reaction)
          .filter((m) => _y(m.createdAt, u))
          .slice()
          .sort(Sy),
      [u, e, t.reaction],
    ),
    b = r.find((m) => m.id === s) ?? r[0] ?? null,
    y = () => {
      i(a);
    },
    h = () => {
      const m = { startDate: "", endDate: "" };
      (n(m), i(m));
    };
  return c.jsx("div", {
    className: "feedback-layout",
    children: c.jsxs("div", {
      className: "feedback-grid",
      children: [
        c.jsxs("section", {
          className: "feedback-list-card",
          children: [
            c.jsx(SectionHeader, {
              title: "피드백 목록",
              className: "feedback-list-header",
            }),
            c.jsxs("div", {
              className: "feedback-filter-bar",
              children: [
                c.jsxs("div", {
                  className: "feedback-filter-field",
                  children: [
                    c.jsx("label", {
                      className: "field__label",
                      htmlFor: "feedback-reaction-filter",
                      children: "유형",
                    }),
                    c.jsx("select", {
                      id: "feedback-reaction-filter",
                      className: "field__input feedback-filter-select",
                      value: t.reaction,
                      onChange: (m) => l({ reaction: m.target.value }),
                      children: by.map((m) =>
                        c.jsx(
                          "option",
                          { value: m.value, children: m.label },
                          m.value,
                        ),
                      ),
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "feedback-range-actions",
                  children: [
                    c.jsxs("div", {
                      className: "feedback-range-field",
                      children: [
                        c.jsx("label", {
                          className: "field__label",
                          htmlFor: "feedback-range-start",
                          children: "시작일",
                        }),
                        c.jsx("input", {
                          id: "feedback-range-start",
                          type: "date",
                          className: "field__input feedback-range-input",
                          value: a.startDate,
                          onChange: (m) =>
                            n((A) => ({ ...A, startDate: m.target.value })),
                        }),
                      ],
                    }),
                    c.jsx("span", {
                      className: "feedback-range-divider",
                      "aria-hidden": "true",
                      children: "~",
                    }),
                    c.jsxs("div", {
                      className: "feedback-range-field",
                      children: [
                        c.jsx("label", {
                          className: "field__label",
                          htmlFor: "feedback-range-end",
                          children: "종료일",
                        }),
                        c.jsx("input", {
                          id: "feedback-range-end",
                          type: "date",
                          className: "field__input feedback-range-input",
                          value: a.endDate,
                          onChange: (m) =>
                            n((A) => ({ ...A, endDate: m.target.value })),
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "feedback-range-buttons",
                      children: [
                        c.jsx("button", {
                          type: "button",
                          className: "primary-button feedback-range-button",
                          onClick: y,
                          children: "검색",
                        }),
                        c.jsx("button", {
                          type: "button",
                          className: "secondary-button feedback-range-button",
                          onClick: h,
                          children: "초기화",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            c.jsx("div", {
              className: "feedback-list-scroll",
              children: c.jsxs("table", {
                className: "content-table",
                children: [
                  c.jsx("thead", {
                    children: c.jsxs("tr", {
                      children: [
                        c.jsx("th", { children: "작성일시" }),
                        c.jsx("th", { children: "단지명" }),
                        c.jsx("th", { children: "사용자" }),
                        c.jsx("th", { children: "반응" }),
                        c.jsx("th", { children: "부정사유" }),
                      ],
                    }),
                  }),
                  c.jsx("tbody", {
                    children:
                      r.length === 0
                        ? c.jsx("tr", {
                            children: c.jsx("td", {
                              colSpan: 5,
                              className: "content-empty",
                              children: "조건에 맞는 피드백이 없습니다.",
                            }),
                          })
                        : r.map((m) =>
                            c.jsxs(
                              "tr",
                              {
                                className:
                                  m.id === (b == null ? void 0 : b.id)
                                    ? "is-selected"
                                    : "",
                                onClick: () => f(m.id),
                                children: [
                                  c.jsx("td", { children: m.createdAt }),
                                  c.jsx("td", { children: m.complexName }),
                                  c.jsx("td", { children: m.userId }),
                                  c.jsx("td", {
                                    children: c.jsx("span", {
                                      className: `feedback-reaction-badge feedback-reaction-badge--${m.reaction.toLowerCase()}`,
                                      children: feedbackReactionLabels[m.reaction],
                                    }),
                                  }),
                                  c.jsx("td", {
                                    children: m.hasNegativeReason
                                      ? "있음"
                                      : "-",
                                  }),
                                ],
                              },
                              m.id,
                            ),
                          ),
                  }),
                ],
              }),
            }),
          ],
        }),
        c.jsx(DetailFrame, {
          className: "feedback-detail-card",
          title: "피드백 상세",
          actions: b
            ? c.jsx("span", {
                className: `feedback-reaction-badge feedback-reaction-badge--${b.reaction.toLowerCase()}`,
                children: feedbackReactionLabels[b.reaction],
              })
            : null,
          children:
            b === null
              ? c.jsx("div", {
                  className: "content-empty content-empty--detail",
                  children: "피드백을 선택하면 상세 정보가 표시됩니다.",
                })
              : c.jsxs("div", {
                  className: "feedback-detail-scroll",
                  children: [
                    c.jsx(SectionHeader, {
                      title: c.jsxs("div", {
                        className: "feedback-detail-identity",
                        children: [
                          c.jsx("span", {
                            className: "feedback-detail-identity__complex",
                            children: b.complexName,
                          }),
                          c.jsx("span", {
                            className: "feedback-detail-identity__user",
                            children: b.userId,
                          }),
                        ],
                      }),
                      className:
                        "detail-frame__header feedback-detail-identity-header",
                      titleAs: "h3",
                    }),
                    c.jsxs("div", {
                      className: "feedback-conversation-section",
                      children: [
                        c.jsx("p", {
                          className: "feedback-conversation-label",
                          children: "대화 내용",
                        }),
                        c.jsx("div", {
                          className: "feedback-conversation",
                          children: b.conversation.map((m, A) =>
                            c.jsxs(
                              "div",
                              {
                                className: `feedback-conversation__turn feedback-conversation__turn--${m.speaker.toLowerCase()}`,
                                children: [
                                  c.jsxs("p", {
                                    className: "feedback-conversation__speaker",
                                    children: [
                                      m.speaker === "USER" ? "사용자" : "챗봇",
                                      " · ",
                                      m.sentAt,
                                    ],
                                  }),
                                  c.jsx("p", {
                                    className: "feedback-conversation__message",
                                    children: m.message,
                                  }),
                                ],
                              },
                              A,
                            ),
                          ),
                        }),
                      ],
                    }),
                    b.reaction === "NEGATIVE" &&
                      b.negativeReason &&
                      c.jsxs("div", {
                        className: "feedback-negative-reason",
                        children: [
                          c.jsx("strong", { children: "부정사유" }),
                          c.jsx("p", { children: b.negativeReason }),
                        ],
                      }),
                  ],
                }),
        }),
      ],
    }),
  });
}
const accountRecords = [
    {
      id: "chat1004",
      name: "박운영",
      role: "MASTER",
      status: "ACTIVE",
      registeredAt: "2025-06-01",
      lastLoginAt: "2026-04-02 08:45",
      loginHistory: [
        {
          id: "lh-001",
          occurredAt: "2026-04-02 08:45",
          success: !0,
          ip: "192.168.1.10",
        },
        {
          id: "lh-002",
          occurredAt: "2026-04-01 09:12",
          success: !0,
          ip: "192.168.1.10",
        },
      ],
      lockHistory: [],
    },
    {
      id: "op2031",
      name: "김관리",
      role: "OPERATOR",
      status: "ACTIVE",
      registeredAt: "2025-09-15",
      lastLoginAt: "2026-04-01 14:30",
      loginHistory: [
        {
          id: "lh-003",
          occurredAt: "2026-04-01 14:30",
          success: !0,
          ip: "10.0.0.5",
        },
        {
          id: "lh-004",
          occurredAt: "2026-03-31 10:00",
          success: !1,
          ip: "10.0.0.5",
        },
      ],
      lockHistory: [],
    },
    {
      id: "op3044",
      name: "이운영",
      role: "OPERATOR",
      status: "INACTIVE",
      registeredAt: "2025-11-20",
      lastLoginAt: "2026-03-10 17:00",
      loginHistory: [
        {
          id: "lh-005",
          occurredAt: "2026-03-10 17:00",
          success: !0,
          ip: "172.16.0.2",
        },
      ],
      lockHistory: [
        {
          id: "lkh-001",
          type: "UNLOCKED",
          reason: "본인 요청 해제",
          actor: "chat1004",
          occurredAt: "2026-03-10 16:55",
        },
        {
          id: "lkh-002",
          type: "LOCKED",
          reason: "OTP 5회 실패",
          actor: "SYSTEM",
          occurredAt: "2026-03-10 16:50",
        },
      ],
    },
    {
      id: "op4099",
      name: "최보안",
      role: "OPERATOR",
      status: "LOCKED",
      registeredAt: "2026-01-05",
      lastLoginAt: null,
      loginHistory: [],
      lockHistory: [
        {
          id: "lkh-003",
          type: "LOCKED",
          reason: "OTP 5회 실패",
          actor: "SYSTEM",
          occurredAt: "2026-04-01 09:30",
        },
      ],
    },
  ],
  candidateAccounts = [
    { id: "emp001", name: "정수진", complexCode: "COMPLEX-101" },
    { id: "emp002", name: "박현준", complexCode: "COMPLEX-205" },
    { id: "emp003", name: "한지원", complexCode: "COMPLEX-310" },
  ];
function calculateAccountStats(e) {
  return {
    total: e.filter((t) => t.status === "ACTIVE").length,
    masters: e.filter((t) => t.role === "MASTER" && t.status === "ACTIVE")
      .length,
    operators: e.filter((t) => t.role === "OPERATOR" && t.status === "ACTIVE")
      .length,
    inactive: e.filter((t) => t.status !== "ACTIVE").length,
  };
}
async function loadAccountData() {
  const e = calculateAccountStats(accountRecords);
  return { accounts: accountRecords, stats: e };
}
const CURRENT_ACCOUNT_ID = "chat1004",
  accountStatusLabels = { ACTIVE: "활성", INACTIVE: "비활성", LOCKED: "잠금" },
  accountRoleLabels = { MASTER: "MASTER", OPERATOR: "OPERATOR" },
  accountActionLabels = {
    ACTIVATE: "권한 복구",
    DEACTIVATE: "권한 비활성화",
    UNLOCK: "잠금 해제",
  },
  jy = 3e3;
function AccountPermissionManagementView({ accounts: e }) {
  const [t, l] = j.useState(e),
    [a, n] = j.useState(null),
    [u, i] = j.useState(null),
    [s, f] = j.useState(!1),
    [r, b] = j.useState(""),
    [y, h] = j.useState(""),
    [m, A] = j.useState(null),
    N = yn(jy),
    R = j.useMemo(
      () => ({
        total: t.filter((S) => S.status === "ACTIVE").length,
        masters: t.filter((S) => S.role === "MASTER" && S.status === "ACTIVE")
          .length,
        operators: t.filter(
          (S) => S.role === "OPERATOR" && S.status === "ACTIVE",
        ).length,
        inactive: t.filter((S) => S.status !== "ACTIVE").length,
      }),
      [t],
    ),
    o = t.find((S) => S.id === a) ?? null,
    d = j.useMemo(() => {
      const S = y.trim().toLowerCase();
      return S
        ? candidateAccounts.filter(
            (_) =>
              _.name.toLowerCase().includes(S) ||
              _.id.toLowerCase().includes(S) ||
              _.complexCode.toLowerCase().includes(S),
          )
        : candidateAccounts;
    }, [y]),
    v = (S, _) => {
      (l((te) => te.map((De) => (De.id === S ? { ...De, status: _ } : De))),
        n(S));
    },
    g = () => {
      if (!u) return;
      const { type: S, accountId: _ } = u;
      (S === "ACTIVATE"
        ? (v(_, "ACTIVE"), N.showMessage("관리자 권한이 복구되었습니다."))
        : S === "DEACTIVATE"
          ? (v(_, "INACTIVE"),
            N.showMessage("관리자 권한이 비활성화되었습니다."))
          : S === "UNLOCK" &&
            (v(_, "ACTIVE"), N.showMessage("계정 잠금이 해제되었습니다.")),
        i(null));
    },
    E = () => {
      (f(!1), b(""), h(""), A(null));
    },
    C = () => {
      if (!m) return;
      const S = {
        id: m.id,
        name: m.name,
        role: "OPERATOR",
        status: "ACTIVE",
        registeredAt: "2026-04-02",
        lastLoginAt: null,
        loginHistory: [],
        lockHistory: [],
      };
      (l((_) => [..._, S]), E(), N.showMessage("관리자가 추가되었습니다."));
    },
    T = (S) => S === CURRENT_ACCOUNT_ID,
    D = [
      { label: "전체 활성", value: `${R.total}명` },
      { label: "MASTER", value: `${R.masters}명` },
      { label: "OPERATOR", value: `${R.operators}명` },
      { label: "비활성·잠금", value: `${R.inactive}명` },
    ];
  return c.jsxs("div", {
    className: "accounts-layout",
    children: [
      c.jsx(ToastStack, {
        items: N.message
          ? [{ key: "accounts-success", tone: "success", message: N.message }]
          : [],
      }),
      c.jsx("div", {
        className: "accounts-stat-grid",
        children: D.map((S) =>
          c.jsxs(
            "div",
            {
              className: "metric-card",
              children: [
                c.jsx("p", {
                  className: "metric-card__label",
                  children: S.label,
                }),
                c.jsx("p", {
                  className: "metric-card__value",
                  children: S.value,
                }),
              ],
            },
            S.label,
          ),
        ),
      }),
      c.jsxs("div", {
        className: "accounts-grid",
        children: [
          c.jsxs("section", {
            className: "accounts-list-card",
            children: [
              c.jsx(SectionHeader, {
                title: "계정 목록",
                actions: c.jsx("button", {
                  type: "button",
                  className: "primary-button",
                  onClick: () => f(!0),
                  children: "계정 추가",
                }),
                className: "panel__header panel__header--compact",
              }),
              c.jsx("div", {
                className: "accounts-list-scroll",
                children: c.jsxs("table", {
                  className: "content-table knowledge-history-table",
                  children: [
                    c.jsx("thead", {
                      children: c.jsxs("tr", {
                        children: [
                          c.jsx("th", { children: "이름" }),
                          c.jsx("th", { children: "아이디" }),
                          c.jsx("th", { children: "권한" }),
                          c.jsx("th", { children: "상태" }),
                          c.jsx("th", { children: "최종 로그인" }),
                        ],
                      }),
                    }),
                    c.jsx("tbody", {
                      children: t.map((S) =>
                        c.jsxs(
                          "tr",
                          {
                            className: S.id === a ? "is-selected" : "",
                            onClick: () => n(S.id),
                            children: [
                              c.jsxs("td", {
                                children: [
                                  c.jsx("div", {
                                    className: "content-table__title",
                                    children: S.name,
                                  }),
                                  T(S.id) &&
                                    c.jsx("div", {
                                      className: "content-table__sub",
                                      children: "본인",
                                    }),
                                ],
                              }),
                              c.jsx("td", { children: S.id }),
                              c.jsx("td", {
                                children: c.jsx("span", {
                                  className: `status-badge ${S.role === "MASTER" ? "status-badge--active" : "status-badge--processing"}`,
                                  children: accountRoleLabels[S.role],
                                }),
                              }),
                              c.jsx("td", {
                                children: c.jsx("span", {
                                  className: `status-badge status-badge--${S.status.toLowerCase()}`,
                                  children: accountStatusLabels[S.status],
                                }),
                              }),
                              c.jsx("td", { children: S.lastLoginAt ?? "-" }),
                            ],
                          },
                          S.id,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
          c.jsx(DetailFrame, {
            className: "accounts-detail-card",
            title: "계정 상세",
            actions: o
              ? c.jsx("span", {
                  className: `status-badge status-badge--${o.status.toLowerCase()}`,
                  children: accountStatusLabels[o.status],
                })
              : null,
            children:
              o === null
                ? c.jsx("div", {
                    className: "content-empty content-empty--detail",
                    children: "관리자를 선택하면 상세 정보가 표시됩니다.",
                  })
                : c.jsxs("div", {
                    className: "accounts-detail-scroll",
                    children: [
                      c.jsx(SectionHeader, {
                        title: c.jsxs("div", {
                          className: "accounts-detail-identity",
                          children: [
                            c.jsx("span", {
                              className: "accounts-detail-identity__name",
                              children: o.name,
                            }),
                            c.jsxs("div", {
                              className: "accounts-detail-identity__meta",
                              children: [
                                c.jsx("span", {
                                  className: "accounts-detail-identity__id",
                                  children: o.id,
                                }),
                                c.jsx("span", {
                                  className: "accounts-detail-identity__role",
                                  children: accountRoleLabels[o.role],
                                }),
                              ],
                            }),
                          ],
                        }),
                        className:
                          "detail-frame__header accounts-detail-identity-header",
                        titleAs: "h3",
                      }),
                      c.jsxs("dl", {
                        className: "content-detail__list",
                        children: [
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "등록일" }),
                              c.jsx("dd", { children: o.registeredAt }),
                            ],
                          }),
                          c.jsxs("div", {
                            children: [
                              c.jsx("dt", { children: "최종 로그인" }),
                              c.jsx("dd", { children: o.lastLoginAt ?? "-" }),
                            ],
                          }),
                        ],
                      }),
                      T(o.id)
                        ? c.jsx("p", {
                            className: "accounts-self-notice",
                            children:
                              "본인 계정은 권한 변경 및 비활성화가 제한됩니다.",
                          })
                        : c.jsxs("div", {
                            className: "accounts-action-row",
                            children: [
                              o.status === "INACTIVE" &&
                                c.jsx("button", {
                                  type: "button",
                                  className: "primary-button",
                                  onClick: () =>
                                    i({
                                      type: "ACTIVATE",
                                      accountId: o.id,
                                      reason: "",
                                    }),
                                  children: "권한 복구",
                                }),
                              o.status === "ACTIVE" &&
                                o.role === "OPERATOR" &&
                                c.jsx("button", {
                                  type: "button",
                                  className: "danger-button",
                                  onClick: () =>
                                    i({
                                      type: "DEACTIVATE",
                                      accountId: o.id,
                                      reason: "",
                                    }),
                                  children: "권한 비활성화",
                                }),
                              o.status === "LOCKED" &&
                                c.jsx("button", {
                                  type: "button",
                                  className: "primary-button",
                                  onClick: () =>
                                    i({
                                      type: "UNLOCK",
                                      accountId: o.id,
                                      reason: "",
                                    }),
                                  children: "잠금 해제",
                                }),
                            ],
                          }),
                      c.jsxs("div", {
                        className: "accounts-history",
                        children: [
                          c.jsx("h4", { children: "로그인 이력" }),
                          o.loginHistory.length === 0
                            ? c.jsx("p", {
                                className: "accounts-history-empty",
                                children: "로그인 이력이 없습니다.",
                              })
                            : c.jsx("ul", {
                                className: "accounts-history-list",
                                children: o.loginHistory.map((S) =>
                                  c.jsxs(
                                    "li",
                                    {
                                      children: [
                                        c.jsx("strong", {
                                          children: S.occurredAt,
                                        }),
                                        S.success
                                          ? c.jsx("span", {
                                              className:
                                                "accounts-login-success",
                                              children: "성공",
                                            })
                                          : c.jsx("span", {
                                              className: "accounts-login-fail",
                                              children: "실패",
                                            }),
                                        c.jsx("span", {
                                          className: "accounts-history-ip",
                                          children: S.ip,
                                        }),
                                      ],
                                    },
                                    S.id,
                                  ),
                                ),
                              }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "accounts-history",
                        children: [
                          c.jsx("h4", { children: "잠금·해제 이력" }),
                          o.lockHistory.length === 0
                            ? c.jsx("p", {
                                className: "accounts-history-empty",
                                children: "잠금·해제 이력이 없습니다.",
                              })
                            : c.jsx("ul", {
                                className: "accounts-history-list",
                                children: o.lockHistory.map((S) =>
                                  c.jsxs(
                                    "li",
                                    {
                                      children: [
                                        c.jsx("strong", {
                                          children: S.occurredAt,
                                        }),
                                        c.jsx("span", {
                                          className:
                                            S.type === "LOCKED"
                                              ? "accounts-history-status--lock"
                                              : "accounts-history-status--unlock",
                                          children:
                                            S.type === "LOCKED"
                                              ? "잠금"
                                              : "해제",
                                        }),
                                        c.jsxs("p", {
                                          className: "accounts-history-sub",
                                          children: [S.reason, " · ", S.actor],
                                        }),
                                      ],
                                    },
                                    S.id,
                                  ),
                                ),
                              }),
                        ],
                      }),
                    ],
                  }),
          }),
        ],
      }),
      u &&
        c.jsx(nl, {
          title: accountActionLabels[u.type],
          ariaLabel: accountActionLabels[u.type],
          onClose: () => i(null),
          size: "sm",
          footer: c.jsxs(c.Fragment, {
            children: [
              c.jsx("button", {
                type: "button",
                className: "secondary-button",
                onClick: () => i(null),
                children: "취소",
              }),
              c.jsx("button", {
                type: "button",
                className:
                  u.type === "DEACTIVATE" ? "danger-button" : "primary-button",
                disabled: !u.reason.trim(),
                onClick: g,
                children: "확인",
              }),
            ],
          }),
          children: c.jsxs("label", {
            className: "field",
            children: [
              c.jsx("span", {
                className: "field__label",
                children: "사유 입력 *",
              }),
              c.jsx("textarea", {
                className: "field__input knowledge-textarea",
                rows: 3,
                value: u.reason,
                placeholder: "사유를 입력해 주세요.",
                onChange: (S) => i({ ...u, reason: S.target.value }),
              }),
            ],
          }),
        }),
      s &&
        c.jsxs(nl, {
          title: "계정 추가",
          ariaLabel: "계정 추가",
          onClose: E,
          size: "lg",
          footer: c.jsxs(c.Fragment, {
            children: [
              c.jsx("button", {
                type: "button",
                className: "secondary-button",
                onClick: E,
                children: "취소",
              }),
              c.jsx("button", {
                type: "button",
                className: "primary-button",
                disabled: !m || !r.trim(),
                onClick: C,
                children: "확인",
              }),
            ],
          }),
          children: [
            c.jsxs("label", {
              className: "field",
              children: [
                c.jsx("span", {
                  className: "field__label",
                  children: "사용자 검색",
                }),
                c.jsx("input", {
                  className: "field__input",
                  value: y,
                  placeholder: "검색어 입력",
                  onChange: (S) => h(S.target.value),
                }),
              ],
            }),
            c.jsx("ul", {
              className: "user-candidate-list",
              children:
                d.length === 0
                  ? c.jsx("li", {
                      className: "user-candidate-empty",
                      children: "검색 결과가 없습니다.",
                    })
                  : d.map((S) =>
                      c.jsx(
                        "li",
                        {
                          children: c.jsxs("button", {
                            type: "button",
                            className: `user-candidate-item${(m == null ? void 0 : m.id) === S.id ? " is-selected" : ""}`,
                            onClick: () => A(S),
                            children: [
                              c.jsxs("span", {
                                children: [S.name, " (", S.id, ")"],
                              }),
                              c.jsx("span", {
                                className: "user-candidate-code",
                                children: S.complexCode,
                              }),
                            ],
                          }),
                        },
                        S.id,
                      ),
                    ),
            }),
            c.jsxs("label", {
              className: "field",
              children: [
                c.jsx("span", {
                  className: "field__label",
                  children: "추가 사유 * (최대 200자)",
                }),
                c.jsx("textarea", {
                  className: "field__input knowledge-textarea",
                  rows: 2,
                  maxLength: 200,
                  value: r,
                  placeholder: "추가 사유를 입력해 주세요.",
                  onChange: (S) => b(S.target.value),
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
const NAV_ITEMS = [
    {
      key: "dashboard",
      label: "대시보드",
      href: "/dashboard",
      roles: ["MASTER", "OPERATOR"],
    },
    {
      key: "content",
      label: "콘텐츠 관리",
      href: "/content",
      roles: ["MASTER"],
    },
    {
      key: "cache-qa",
      label: "캐시 답변 관리",
      href: "/cache-qa",
      roles: ["MASTER"],
    },
    {
      key: "knowledge",
      label: "지식 기반 조회",
      href: "/knowledge",
      roles: ["MASTER", "OPERATOR"],
    },
    {
      key: "feedback",
      label: "피드백 관리",
      href: "/feedback",
      roles: ["MASTER", "OPERATOR"],
    },
    {
      key: "accounts",
      label: "계정/권한 관리",
      href: "/accounts",
      roles: ["MASTER"],
    },
  ],
  ROUTE_META = {
    "/": {
      title: "대시보드",
      description: "운영 현황을 한눈에 확인하는 메인 화면입니다.",
    },
    "/dashboard": {
      title: "대시보드",
      description: "운영 현황을 한눈에 확인하는 메인 화면입니다.",
    },
    "/content": {
      title: "콘텐츠 관리",
      description:
        "RAG 문서를 등록하고 수정, 삭제, 이력을 관리하는 화면입니다.",
    },
    "/knowledge": {
      title: "지식 기반 조회",
      description: "등록된 문서를 기반으로 응답 테스트를 수행하는 화면입니다.",
    },
    "/feedback": {
      title: "피드백 관리",
      description: "피드백 목록과 상세 정보를 확인하는 화면입니다.",
    },
    "/accounts": {
      title: "계정/권한 관리",
      description: "운영 계정과 권한 상태를 확인하는 화면입니다.",
    },
    "/cache-qa": {
      title: "캐시 답변 관리",
      description: "캐시 응답과 질문을 단위로 관리하는 화면입니다.",
    },
  },
  feedbackRecords = [
    {
      id: "fb-001",
      complexName: "한강 아파트",
      userId: "user_2***",
      reaction: "POSITIVE",
      hasNegativeReason: !1,
      createdAt: "2026-04-02 09:15",
      conversation: [
        {
          speaker: "USER",
          message: "수납 방법이 어떻게 되나요?",
          sentAt: "2026-04-02 09:14",
        },
        {
          speaker: "BOT",
          message:
            "수납은 관리비 고지서 기준으로 매월 25일까지 납부하시면 됩니다. 온라인 뱅킹 또는 자동이체를 통해 납부하실 수 있습니다.",
          sentAt: "2026-04-02 09:14",
        },
      ],
      negativeReason: null,
    },
    {
      id: "fb-002",
      complexName: "마포 자이",
      userId: "user_5***",
      reaction: "NEGATIVE",
      hasNegativeReason: !0,
      createdAt: "2026-04-02 10:22",
      conversation: [
        {
          speaker: "USER",
          message: "차량 등록 서류가 뭔가요?",
          sentAt: "2026-04-02 10:21",
        },
        {
          speaker: "BOT",
          message:
            "차량 등록을 위해서는 주민등록등본, 차량등록증, 인감증명서가 필요합니다.",
          sentAt: "2026-04-02 10:21",
        },
      ],
      negativeReason:
        "응답이 너무 간략합니다. 구체적인 절차 안내가 필요합니다.",
    },
    {
      id: "fb-003",
      complexName: "강남 래미안",
      userId: "user_9***",
      reaction: "POSITIVE",
      hasNegativeReason: !1,
      createdAt: "2026-04-01 16:40",
      conversation: [
        {
          speaker: "USER",
          message: "연말정산 관련 서류 제출 기한이 언제인가요?",
          sentAt: "2026-04-01 16:39",
        },
        {
          speaker: "BOT",
          message:
            "연말정산 서류 제출 기한은 매년 1월 15일까지입니다. 회사 내부 정책에 따라 조기 마감될 수 있으니 인사팀에 확인하세요.",
          sentAt: "2026-04-01 16:39",
        },
      ],
      negativeReason: null,
    },
    {
      id: "fb-004",
      complexName: "서초 e편한세상",
      userId: "user_3***",
      reaction: "NEGATIVE",
      hasNegativeReason: !1,
      createdAt: "2026-04-01 11:05",
      conversation: [
        {
          speaker: "USER",
          message: "보안 서비스 신청 방법을 알려주세요",
          sentAt: "2026-04-01 11:04",
        },
        {
          speaker: "BOT",
          message: "죄송합니다. 해당 내용에 대한 정보를 찾지 못했습니다.",
          sentAt: "2026-04-01 11:04",
        },
      ],
      negativeReason: null,
    },
  ];
async function loadFeedbackItems() {
  return feedbackRecords.slice().sort((e, t) => t.createdAt.localeCompare(e.createdAt));
}
const Dy = "xperp-mock-auth-stage",
  Rr = "xperp-mock-authenticated",
  Cy = "xperp-mock-auth-user",
  Ry = "xperp-mock-otp-failures",
  zy = "xperp-mock-otp-locked";
function Sidebar({ currentPath: e, onNavigate: t, onLogout: l }) {
  const [a, n] = j.useState(!1),
    u = Mh(),
    i = NAV_ITEMS.filter((f) => f.roles.includes(u.role)),
    s = () => {
      (typeof window < "u" &&
        (window.sessionStorage.removeItem(Dy),
        window.sessionStorage.removeItem(Rr),
        window.sessionStorage.removeItem(Cy),
        window.sessionStorage.removeItem(Ry),
        window.sessionStorage.removeItem(zy),
        window.localStorage.removeItem(Rr)),
        Lv(),
        n(!1),
        l());
    };
  return c.jsxs("aside", {
    className: "sidebar",
    children: [
      c.jsxs("div", {
        className: "sidebar__brand",
        children: [
          c.jsx("div", { className: "sidebar__logo", children: "XpERP" }),
          c.jsx("div", {
            className: "sidebar__badge",
            children: "AI 관리자로",
          }),
        ],
      }),
      c.jsx("nav", {
        className: "sidebar__nav",
        "aria-label": "메뉴",
        children: i.map((f) => {
          const r = e === f.href;
          return c.jsxs(
            "button",
            {
              type: "button",
              className: `sidebar__nav-item${r ? " is-active" : ""}`,
              onClick: () => t(f.href),
              "aria-current": r ? "page" : void 0,
              children: [
                c.jsx("span", {
                  className: "sidebar__nav-icon",
                  "aria-hidden": "true",
                  children: f.key.slice(0, 1).toUpperCase(),
                }),
                c.jsx("span", { children: f.label }),
              ],
            },
            f.key,
          );
        }),
      }),
      c.jsxs("div", {
        className: "sidebar__user",
        children: [
          c.jsxs("div", {
            className: "sidebar__user-row",
            children: [
              c.jsx("div", {
                className: "sidebar__user-name",
                children: u.name,
              }),
              c.jsx("div", { className: "sidebar__user-meta", children: u.id }),
            ],
          }),
          c.jsxs("div", {
            className: "sidebar__user-role",
            children: [u.role, " · ", u.department],
          }),
          c.jsx("button", {
            type: "button",
            className: "secondary-button sidebar__logout",
            onClick: () => n(!0),
            children: "로그아웃",
          }),
        ],
      }),
      a
        ? c.jsx(nl, {
            title: "로그아웃",
            ariaLabel: "로그아웃 확인",
            onClose: () => n(!1),
            size: "sm",
            compact: !0,
            backdropClassName: "logout-backdrop",
            headerClassName: "modal__header--tight",
            footerClassName: "modal__footer--split",
            footer: c.jsxs(c.Fragment, {
              children: [
                c.jsx("button", {
                  type: "button",
                  className: "secondary-button",
                  onClick: () => n(!1),
                  children: "취소",
                }),
                c.jsx("button", {
                  type: "button",
                  className: "danger-button",
                  onClick: s,
                  children: "확인",
                }),
              ],
            }),
            children: c.jsx("p", {
              className: "logout-confirm__text",
              children: "로그아웃 하시겠습니까?",
            }),
          })
        : null,
    ],
  });
}
function TopHeader({ title: e, description: t, rightSlot: l }) {
  return c.jsxs("header", {
    className: "top-header",
    children: [
      c.jsxs("div", {
        className: "top-header__copy",
        children: [
          c.jsx("h1", { className: "top-header__title", children: e }),
          t
            ? c.jsx("p", { className: "top-header__description", children: t })
            : null,
        ],
      }),
      l ? c.jsx("div", { className: "top-header__slot", children: l }) : null,
    ],
  });
}
function DashboardShell({ currentPath: e, onNavigate: t, onLogout: l }) {
  const a = Mh(),
    n = ROUTE_META[e] ?? ROUTE_META["/dashboard"],
    u = j.useMemo(
      () => NAV_ITEMS.filter((r) => r.roles.includes(a.role)).map((r) => r.href),
      [a.role],
    ),
    [i, s] = j.useState(null);
  (j.useEffect(() => {
    let r = !0;
    return (
      Promise.all([loadFeedbackItems(), loadAccountData(), my()]).then(([b, y, h]) => {
        r &&
          s({
            feedbacks: b,
            accounts: y.accounts,
            knowledgeDocuments: h.documents,
          });
      }),
      () => {
        r = !1;
      }
    );
  }, []),
    j.useEffect(() => {
      u.includes(e) || (u[0] && t(u[0]));
    }, [e, t, u]));
  const f = () => {
    switch (e) {
      case "/dashboard":
        return c.jsx(DashboardView, { data: DASHBOARD_SECTIONS.WEEK });
      case "/content":
        return c.jsx(ContentManagementView, { documents: contentDocuments });
      case "/cache-qa":
        return c.jsx(CacheAnswerManagementView, { items: cacheQaRecords });
      case "/knowledge":
        return i
          ? c.jsx(KnowledgeQueryView, { documents: i.knowledgeDocuments })
          : c.jsx(LoadingPlaceholder, { label: "지식 기반 조회" });
      case "/feedback":
        return i
          ? c.jsx(FeedbackManagementView, { feedbacks: i.feedbacks })
          : c.jsx(LoadingPlaceholder, { label: "피드백 관리" });
      case "/accounts":
        return i
          ? c.jsx(AccountPermissionManagementView, { accounts: i.accounts })
          : c.jsx(LoadingPlaceholder, { label: "계정/권한 관리" });
      default:
        return c.jsx(DashboardView, { data: DASHBOARD_SECTIONS.WEEK });
    }
  };
  return c.jsxs("div", {
    className: "admin-shell",
    children: [
      c.jsx(Sidebar, { currentPath: e, onNavigate: t, onLogout: l }),
      c.jsxs("div", {
        className: "admin-shell__main",
        children: [
          c.jsx(TopHeader, { title: n.title, description: n.description }),
          c.jsx("main", { className: "admin-shell__content", children: f() }),
        ],
      }),
    ],
  });
}
function LoadingPlaceholder({ label: e }) {
  return c.jsx("section", {
    className: "panel panel--main",
    children: c.jsxs("div", {
      className: "content-empty content-empty--detail",
      children: [e, " 데이터를 불러오는 중입니다."],
    }),
  });
}
const AUTHENTICATED_STATUS = "authenticated";
function App() {
  const [e, t] = j.useState(!1),
    [l, a] = j.useState("/dashboard");
  j.useEffect(() => {
    typeof window > "u" || t(window.sessionStorage.getItem(su) === AUTHENTICATED_STATUS);
  }, []);
  const n = () => {
      (t(!0), a("/dashboard"));
    },
    u = () => {
      (t(!1), a("/dashboard"));
    };
  return e
    ? c.jsx(DashboardShell, { currentPath: l, onNavigate: a, onLogout: u })
    : c.jsx(AuthScreen, { onAuthenticated: n });
}
zv.createRoot(document.getElementById("root")).render(
  c.jsx(Ph.StrictMode, { children: c.jsx(App, {}) }),
);
