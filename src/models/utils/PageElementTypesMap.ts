const BlockTypeBase = 'Content::Block::';

const pageElementTypeMap = new Map();
pageElementTypeMap.set('bordered_container', `${BlockTypeBase}BorderedContainer`);
pageElementTypeMap.set('title', `${BlockTypeBase}Title`);
pageElementTypeMap.set('title_medium', `${BlockTypeBase}TitleMedium`);
pageElementTypeMap.set('title_small', `${BlockTypeBase}TitleSmall`);

export default pageElementTypeMap;
