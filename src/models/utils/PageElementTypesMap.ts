const BLOCK_TYPE_BASE = 'Content::Block::';

export const BlockTypes = {
  BORDERED_CONTAINER: 'bordered_container',
  BULLET: 'bullet',
  DIVIDER: 'divider',
  IMAGE: 'image',
  TEXT: 'text',
  TITLE: 'title',
  TITLE_MEDIUM: 'title_medium',
  TITLE_SMALL: 'title_small'
}

const PageElementTypeMap = new Map();
PageElementTypeMap.set(BlockTypes.BORDERED_CONTAINER, `${BLOCK_TYPE_BASE}BorderedContainer`);
PageElementTypeMap.set(BlockTypes.BULLET, `${BLOCK_TYPE_BASE}Bullet`);
PageElementTypeMap.set(BlockTypes.DIVIDER, `${BLOCK_TYPE_BASE}Divider`);
PageElementTypeMap.set(BlockTypes.IMAGE, `${BLOCK_TYPE_BASE}Image`);
PageElementTypeMap.set(BlockTypes.TEXT, `${BLOCK_TYPE_BASE}Text`);
PageElementTypeMap.set(BlockTypes.TITLE, `${BLOCK_TYPE_BASE}Title`);
PageElementTypeMap.set(BlockTypes.TITLE_MEDIUM, `${BLOCK_TYPE_BASE}TitleMedium`);
PageElementTypeMap.set(BlockTypes.TITLE_SMALL, `${BLOCK_TYPE_BASE}TitleSmall`);

export default PageElementTypeMap;
