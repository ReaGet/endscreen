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