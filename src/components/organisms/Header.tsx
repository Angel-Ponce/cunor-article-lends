import { app as appAtom } from "../../stores/app";
import { Avatar, Popover, Typography } from "antd";
import { useAtom } from "jotai";
import { user as userAtom } from "../../stores/auth";
import UserOptions from "./UserOptions";
import { AiOutlineCaretDown } from "react-icons/ai";

const Header = () => {
  const [app] = useAtom(appAtom);
  const [user] = useAtom(userAtom);

  return (
    <div className="w-full py-4 mb-8 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        {app.icon && (
          <div className="text-xl flex justify-center items-center rounded-full w-8 h-8 bg-[#001529] text-white">
            {app.icon}
          </div>
        )}
        {app.title && (
          <Typography.Title level={2} className="!my-0">
            {app.title}
          </Typography.Title>
        )}
      </div>
      <Popover
        content={<UserOptions />}
        placement="bottomRight"
        trigger="click"
        arrow={false}
      >
        <div className="flex gap-3 items-center cursor-pointer select-none hover:bg-gray-200 px-7 py-1.5 rounded-full">
          <Avatar
            size={36}
            src={`https://api.dicebear.com/6.x/identicon/svg?seed=${user?.name}${user?.lastname}`}
          />
          <div className="flex flex-col">
            <Typography.Text className="text-md font-medium !my-0">
              {user?.name} {user?.lastname}
            </Typography.Text>
            <Typography.Text className="!my-0" type="secondary">
              {user?.role}
            </Typography.Text>
          </div>
          <AiOutlineCaretDown className="text-gray-400" />
        </div>
      </Popover>
    </div>
  );
};

export default Header;
