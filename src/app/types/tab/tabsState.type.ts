export type TabsStateType = {
  tabs: TabType[];
  activeTab: TabType;
};

export type TabType = {
  tabName: string;
  tabRoute: string;
  order: number;
};
