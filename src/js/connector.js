const connections = {};
let idGenerator = 0;

HTMLElement.prototype.show = function() { this.style.display = "block" };
HTMLElement.prototype.hide = function() { this.style.display = "none" };
HTMLElement.prototype.offset = function() {
  return {
      left: this.offsetLeft,
      top: this.offsetTop
  };
};

const positionConnection = (connection) => {
  const posA = connection.elementA.offset();
  posA.left = parseInt(posA.left, 10) + parseInt(connection.elementA.offsetWidth / 2, 10);
  posA.top = parseInt(posA.top, 10) + parseInt(connection.elementA.offsetHeight / 2, 10);

  const posB = connection.elementB.offset();
  posB.left = parseInt(posB.left, 10) + parseInt(connection.elementB.offsetWidth / 2, 10);
  posB.top = parseInt(posB.top, 10) + parseInt(connection.elementB.offsetHeight / 2, 10);

  const line1 = document.querySelector(`#${connection.id}_1`);
  const line2 = document.querySelector(`#${connection.id}_2`);
  const line3 = document.querySelector(`#${connection.id}_3`);

  // Items vetically or horizontally equal
  if (posA.left === posB.left || posA.top === posB.top) {
    line1.show();
    line2.hide();
    line3.hide();

    if (posA.left === posB.left) {
      positionVerticalLine(line1, posA, posB, connection.radius, connection.roundedCorners);
    } else {
      positionHorizontalLine(line1, posA, posB, connection.radius, connection.roundedCorners);
    }
  } else {
    if (connection.anchorA != connection.anchorB) {
      line1.show();
      line2.show();
      line3.hide();

      const corner = {};
      if (connection.anchorA == "vertical") {
        corner.left = posA.left;
        corner.top = posB.top;

        positionVerticalLine(line1, posA, corner, connection.radius, connection.roundedCorners);
        positionHorizontalLine(line2, posB, corner, connection.radius, connection.roundedCorners);
      } else {
        corner.left = posB.left;
        corner.top = posA.top;

        positionVerticalLine(line1, posB, corner, connection.radius, connection.roundedCorners);
        positionHorizontalLine(line2, posA, corner, connection.radius, connection.roundedCorners);
      }
    } else {
      line1.show();
      line2.show();
      line3.show();

      const corner1 = {},
        corner2 = {};

      if (connection.anchorA == "vertical") {
        corner1.top = parseInt((posA.top + posB.top) / 2, 10);
        corner2.top = corner1.top;
        corner1.left = posA.left;
        corner2.left = posB.left;

        // Draw lines.
        positionVerticalLine(line1, posA, corner1, connection.radius, connection.roundedCorners);
        positionVerticalLine(line2, posB, corner2, connection.radius, connection.roundedCorners);
        positionHorizontalLine(line3, corner1, corner2, connection.radius, connection.roundedCorners);
      } else {
        corner1.left = parseInt((posA.left + posB.left)/2, 10);
        corner2.left = corner1.left;
        corner1.top = posA.top;
        corner2.top = posB.top;
        
        // Draw lines.
        positionHorizontalLine(line1, posA, corner1, connection.radius, connection.roundedCorners);
        positionHorizontalLine(line2, posB, corner2, connection.radius, connection.roundedCorners);
        positionVerticalLine(line3, corner1, corner2, connection.radius, connection.roundedCorners);
      }
    }
  }
};

const positionVerticalLine = (line, point1, point2, radius) => {
  const halfRadius = parseInt(radius / 2, 10);
  line.style.left = `${point1.left - halfRadius}px`;
  line.style.top = `${point1.top > point2.top ? (point2.top - halfRadius) : (point1.top - halfRadius)}px`;
  line.style.width = `${radius}px`;
  line.style.height = `${point1.top > point2.top ? (point1.top - point2.top + halfRadius) : (point2.top - point1.top + halfRadius)}px`;
};

const positionHorizontalLine = (line, point1, point2, radius) => {
  const halfRadius = parseInt(radius / 2, 10);
  line.style.top = `${point1.top - halfRadius}px`;
  line.style.left = `${point1.left > point2.left ? (point2.left - halfRadius) : (point1.left - halfRadius)}px`;
  line.style.height = `${radius}px`;
  line.style.width = `${point1.left > point2.left ? (point1.left - point2.left + halfRadius) : (point2.left - point1.left + halfRadius)}px`;
};

/**
 * 
 * @param {String|HTMLElement} elementA first element selector or HtmlElement
 * @param {String|HTMLElement} elementB second element selector or HtmlElement
 * @param {Object} options 
 * @returns 
 */
export const connect = (elementA, elementB, options = {}) => {
  if (elementA === null || elementB === null) {
    return null;
  }

  if (typeof elementA === "string") elementA = document.querySelector(elementA);
  if (typeof elementB === "string") elementB = document.querySelector(elementB);

  const connection = {};
  connection.id = `connection${idGenerator++}`;
  connection.elementA = elementA;
  connection.elementB = elementB;
  connection.color = options?.color ? options.color : "#808080";
  connection.radius = options?.radius && !isNaN(options.radius) ? parseInt(options.radius) : 5;
  connection.anchorA = options?.anchorA && (options.anchorA == "vertical" || options.anchorA == "horizontal") ? options.anchorA : "horizontal";
  connection.anchorB = options?.anchorB && (options.anchorB == "vertical" || options.anchorB == "horizontal") ? options.anchorB : "horizontal";
  connection.roundedCorners = true || options?.roundedCorners;
  connection.click = options?.click ? options.click : null;
  connection.mouseover = options?.mouseover ? options.mouseover : null;
  connection.mouseout = options?.mouseout ? options.mouseout : null;

  connections[connection.id] = connection;
  const cornerRadius = parseInt(connection.radius/2,10);
  const div = `<div
                  id="divUniqueIdentifier"
                  class="jqSimpleConnect ${connection.id}"
                  style="position:absolute;
                          width:${connection.radius}px;
                          height:${connection.radius}px;
                          background-color:${connection.color};
                          ${
                            connection.roundedCorners ? (
                              'border-radius:' + cornerRadius + 'px;' +
                              '-webkit-border-radius:' + cornerRadius +'px;' +
                              '-moz-border-radius:' + cornerRadius + 'px; '
                            ) : ""
                          }">
                </div>`;
  
  document.body.insertAdjacentHTML("afterbegin", div.replace('divUniqueIdentifier', connection.id + '_1'));
  document.body.insertAdjacentHTML("afterbegin", div.replace('divUniqueIdentifier', connection.id + '_2'));
  document.body.insertAdjacentHTML("afterbegin", div.replace('divUniqueIdentifier', connection.id + '_3'));

  positionConnection(connection);

  return connection.id;
};

export const repaintConnect = (connectionId) => {
  const connection = connections[connectionId];
  if(connection != null) {
    positionConnection(connection);
    return true;
  }
  return false;
};

export const repaintAll = () => {
  for(const key in connections) {
    positionConnection(connections[key]);
  }
};

export const removeConnection = (connectionId) => {
  if(connections[connectionId] != null) {
    document.querySelector(`.jqSimpleConnect.${connectionId}`).remove();
    
    connections[connectionId] = null;
    delete connections[connectionId];
    
    return true;
  }
  return false;
};

export const removeAll = () => {
  for(const key in connections) {
    removeConnection(key);
  }
}; 