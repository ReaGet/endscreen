import { TAB_TYPE_PARAMS } from "../constants.js";

export const getContinuation = (
  items,
  accessors = ["continuationEndpoint"]
) => {
  const continuation = items[items.length - 1];
  const renderer = continuation?.continuationItemRenderer;
  if (!renderer) return;

  let current = renderer;
  for (const accessor of accessors) {
    current = current[accessor];
  }

  return current.continuationCommand.token;
}

export const parseTabData = (name, data) => {
  const tab = data.contents?.twoColumnBrowseResultsRenderer.tabs.find((t) => {
    return (
      t.tabRenderer?.endpoint.browseEndpoint.params ===
      TAB_TYPE_PARAMS[name]
    );
  });

  return (
    tab?.tabRenderer.content.sectionListRenderer?.contents?.[0].itemSectionRenderer
      .contents[0].gridRenderer?.items ||
    tab?.tabRenderer.content?.richGridRenderer?.contents.map(
      (c) => c.richItemRenderer?.content || c
    ) ||
    tab?.tabRenderer.content?.sectionListRenderer.contents?.[0].itemSectionRenderer
      .contents.map(
      (c) => c.backstagePostThreadRenderer?.post || c
    ) ||
    data.onResponseReceivedActions?.[0].appendContinuationItemsAction.continuationItems.map(
      (c) => c.richItemRenderer?.content || c
    ) ||
    data.onResponseReceivedEndpoints?.[0].appendContinuationItemsAction.continuationItems.map(
      (c) => c.backstagePostThreadRenderer?.post || c
    ) ||
    []
  );
}

export const dateFormatter = (value, format = "date") => {
  const options = {};

  if (format.includes("date")) {
    options.day = "2-digit";
    options.month = "2-digit";
    options.year = "numeric";
  }

  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }

  return (
    value &&
    new Intl.DateTimeFormat("ru-RU", options).format(new Date(value))
  );
};

// new Intl.DateTimeFormat(["ru-RU"], {
//   day: "2-digit",
//   month: "2-digit",
//   year: "numeric",
// }).format;