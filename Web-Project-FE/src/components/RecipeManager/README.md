# 食谱筛选功能使用说明

## 🎯 功能概述

本筛选系统允许用户根据三个主要条件来过滤食谱：
1. **国家/地区** - 按食谱来源国家筛选
2. **主要成分** - 按主要食材筛选
3. **避免的过敏原** - 排除包含特定过敏原的食谱

## 📊 数据来源

筛选选项是从 `src/data/recipes.js` 中的食谱数据自动生成的：

### 国家/地区选项
- China (中国)
- Italy (意大利)
- Japan (日本)
- Korea (韩国)
- Turkey (土耳其)
- Vietnam (越南)

### 主要成分选项
- Beef (牛肉)
- Chicken (鸡肉)
- Ground beef and/or lamb (牛肉/羊肉)
- Pasta (意大利面)

### 过敏原选项
- Dairy (乳制品)
- Eggs (鸡蛋)
- Fish (鱼类)
- Gluten (麸质)
- Peanut (花生)
- Sesame (芝麻)
- Soy (大豆)

## 🔧 组件结构

### 1. RecipeFilter.jsx
主要的筛选组件，包含：
- 三个下拉选择器（国家、主要成分、过敏原）
- 过敏原多选功能
- 清除筛选按钮
- 筛选条件显示

### 2. Recipes.jsx
更新后的食谱列表组件：
- 集成筛选功能
- 显示筛选结果统计
- 空状态处理
- 加载状态

### 3. RecipeCard.jsx
更新后的食谱卡片组件：
- 直接接收recipe数据
- 显示过敏原标签
- 国家标志显示
- 书签功能

### 4. FilterStats.jsx
筛选选项统计组件：
- 显示每个选项的食谱数量
- 帮助用户了解数据分布

## 🚀 使用方法

### 基本筛选
```jsx
import RecipeFilter from './RecipeFilter';
import { filterRecipes } from '../../data/recipes';

function MyComponent() {
  const [filters, setFilters] = useState({
    country: '',
    mainIngredient: '',
    allergens: []
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = filterRecipes(recipes, newFilters);
    // 处理筛选结果
  };

  return (
    <RecipeFilter onFilterChange={handleFilterChange} />
  );
}
```

### 筛选逻辑
- **国家筛选**: 精确匹配
- **主要成分筛选**: 精确匹配
- **过敏原筛选**: 排除包含指定过敏原的食谱

### 组合筛选
用户可以同时使用多个筛选条件，系统会应用AND逻辑：
- 必须同时满足所有选中的条件
- 过敏原筛选是排除逻辑（避免包含指定过敏原的食谱）

## 📱 响应式设计

筛选组件采用响应式设计：
- 桌面端：三列布局
- 平板端：两列布局
- 移动端：单列布局

## 🎨 样式特点

- 使用Tailwind CSS
- 橙色主题色
- 清晰的视觉层次
- 悬停效果和过渡动画
- 过敏原标签颜色编码

## 🔄 实时筛选

- 用户选择筛选条件时立即更新结果
- 使用防抖技术避免频繁筛选
- 显示筛选结果数量
- 支持清除所有筛选条件

## 📈 扩展性

系统设计支持轻松扩展：
- 添加新的筛选条件
- 修改筛选逻辑
- 自定义筛选选项
- 集成后端API

## 🐛 故障排除

### 常见问题
1. **筛选结果为空**: 检查筛选条件是否过于严格
2. **过敏原筛选不工作**: 确认过敏原名称拼写正确
3. **样式问题**: 检查Tailwind CSS是否正确加载

### 调试技巧
- 使用浏览器开发者工具检查筛选状态
- 查看控制台日志了解筛选过程
- 使用FilterStats组件了解数据分布

