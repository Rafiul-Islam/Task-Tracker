import url from "url";

function getUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
}

export default getUrl;
