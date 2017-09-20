import React from "react";
import CMS from "netlify-cms";

import PostPreview from "./cms-preview-templates/post";
import ProductsPreview from "./cms-preview-templates/products";


// Example of creating a custom color widget
class ColorControl extends React.Component {
    render() {
        return <input
            style={{ height: "80px" }}
            type="color"
            value={this.props.value}
            onInput={(e) => this.props.onChange(e.target.value)}
        />;
    }
}

class YoutubeVideoControl extends React.Component {
    render() {
        return <input type="text" value={this.props.value} onInput={(e) => this.props.onChange(e.target.value)} />;
    }
}

class YoutubeVideoPreview extends React.Component {
    render() {
        const { entry, widgetFor } = this.props;
        const title = entry.getIn(["data", "title"]);
        return <div className="mw6 center ph3 pv4">
            <h1 className="f2 lh-title b mb3">{title}</h1>
            <div className="flex justify-between grey-3">
                <img src={`https://i.ytimg.com/vi/${entry.getIn(["data", "id"])}/hqdefault.jpg`} alt={`Video ${title}`} />
            </div>
        </div>;
    }
}

CMS.registerEditorComponent({
    // Internal id of the component
    id: "youtube",
    // Visible label
    label: "Youtube",
    // Fields the user need to fill out when adding an instance of the component
    fields: [{name: 'id', label: 'Youtube Video ID', widget: 'string'}],
    // Pattern to identify a block as being an instance of this component
    pattern: "youtube (\S+)\s",
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      return {
        id: match[1]
      };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) {
      return 'youtube ' + obj.id;
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) {
      return (
        '<img src="http://img.youtube.com/vi/' + obj.id + '/maxresdefault.jpg" alt="Youtube Video"/>'
      );
    }
  });

CMS.registerPreviewStyle("/css/main.css");
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);

CMS.registerWidget("color", ColorControl);

CMS.registerWidget("video", YoutubeVideoControl);
CMS.registerPreviewTemplate("video", YoutubeVideoPreview);
