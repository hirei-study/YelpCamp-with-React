import Layer from "@/layer/Layer";

const NotFound = () => {
  return (
    <Layer>
      <div className="alert alert-danger text-center mt-5" role="alert">
        <h1 className="alert-heading">404 Not Found</h1>
        <p className="mb-0">お探しのページは見つかりませんでした。</p>
        {/* ここにオシャレなデザインを追加 */}
      </div>
    </Layer>
  );
};

export default NotFound;
