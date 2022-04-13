import { Resizable } from 're-resizable'
import ResizeHandle from '../components/resize_handle'

const ResizableContainer: React.FC = ({ children }) => {
  return (
    <Resizable
      defaultSize={{
        width: '100%',
        height: document.documentElement.clientHeight / 2,
      }}
      enable={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      handleComponent={{
        bottom: <ResizeHandle />,
      }}
    >
      {children}
    </Resizable>
  )
}

export default ResizableContainer
