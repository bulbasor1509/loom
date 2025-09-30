import {
    type RouteConfig,
    route
} from "@react-router/dev/routes";

export default [
    route("/", "./src/App.tsx")
] satisfies RouteConfig;
