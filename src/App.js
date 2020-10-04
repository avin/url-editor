import React from "react";

function getUrlParams() {
  let urlParams = {};
  try {
    const search = window.location.search.substring(1);
    urlParams = JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } catch (e) {}

  return urlParams;
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function insertUrlParam(key, value) {
  const params = getUrlParams();
  params[key] = value;

  window.history.replaceState(null, null, `?${serialize(params)}`);
}

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      urlParams: getUrlParams(),
    };
  }

  handleChangeField(key) {
    return (e) => {
      const value = e.target.value;

      insertUrlParam(key, value);

      this.setState({
        urlParams: {
          ...this.state.urlParams,
          [key]: value,
        },
      });
    };
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  render() {
    const { urlParams } = this.state;
    const { params } = this.props;

    const keys = Array.from(new Set([...params, ...Object.keys(urlParams)]));

    return (
      <form onSubmit={this.handleSubmitForm}>
        <table>
          <tbody>
            {keys.map((key) => {
              return (
                <tr key={key}>
                  <td>
                    <label htmlFor={`value-${key}`}>{key}</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={this.handleChangeField(key)}
                      value={urlParams[key] || ""}
                      style={{minWidth: 300}}
                    />
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={2}>
                <button type="submit" style={{ width: "100%" }}>
                  Reload
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}
