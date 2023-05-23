import { Skeleton } from "antd";

export default function MySkeletonLoader({ size, block }) {
  return <Skeleton.Input active={true} size={size} block={block} />;
}
