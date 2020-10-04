import React from "react";
import {
  FormGroup,
  InputGroup,
  Card,
  Elevation,
  Button,
  Intent,
} from "@blueprintjs/core";

function getUrlParams() {
  let urlParams = {};
  try {
    const search = window.location.search.substring(1);
    urlParams = JSON.parse(
      '{"' +
        decodeURI(search)
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
    e.preventDefault()
    window.location.reload();
  };

  render() {
    const { urlParams } = this.state;
    const { params } = this.props;

    const keys = Array.from(new Set([...params, ...Object.keys(urlParams)]));

    return (
      <Card elevation={Elevation.ONE} style={{ maxWidth: 420 }}>
        <form onSubmit={this.handleSubmitForm}>
          {keys.map((key) => {
            return (
              <FormGroup key={key} label={key} labelFor={`value-${key}`}>
                <InputGroup
                  id={`value-${key}`}
                  placeholder={key}
                  onChange={this.handleChangeField(key)}
                  value={urlParams[key] || ""}
                />
              </FormGroup>
            );
          })}
          <Button intent={Intent.PRIMARY} type="submit">
            Reload
          </Button>
        </form>
      </Card>
    );
  }
}
