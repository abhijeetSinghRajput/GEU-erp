import { Code, Eye, Monitor } from "lucide-react";
import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

const codeTabs = [
  {
    name: "FeeSubmission.jsx",
    language: "jsx",
    code: `// Example: Fee module with tabs pattern
<Tabs defaultValue="course" className="w-full">
  <TabsList>
    <TabsTrigger value="course">Course Fees</TabsTrigger>
    <TabsTrigger value="hostel">Hostel Fees</TabsTrigger>
    <TabsTrigger value="receipts">Receipts</TabsTrigger>
  </TabsList>

  <TabsContent value="course">
    <CourseFee />
  </TabsContent>

  <TabsContent value="hostel">
    <HostelFee />
  </TabsContent>

  <TabsContent value="receipts">
    <FeeReceipts data={feeReceipts} />
  </TabsContent>
</Tabs>`,
  },
  {
    name: "CircularDetailsDrawer.jsx",
    language: "jsx",
    code: `// Example: Notice module with drawer pattern
<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
  <DrawerTrigger asChild>
    <Button variant="secondary">View All Notices</Button>
  </DrawerTrigger>
  <DrawerContent className="h-[90vh]">
    {/* notice content */}
  </DrawerContent>
</Drawer>`,
  },
  {
    name: "AttendanceTable.jsx",
    language: "jsx",
    code: `// Example: Attendance module with calendar dialog

const handleRowClick = (subject) => {
  setSelectedSubject(subject);
  setIsDialogOpen(true);
};

return (
  <>
    {/* Attendance table */}
    <DataTable
      data={attendance.state}
      columns={columns}
      onRowClick={handleRowClick}
    />

    {/* Dialog showing attendance details */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedSubject?.Subject}</DialogTitle>
        </DialogHeader>

        {/* Circular progress + calendar */}
        <CircularProgress value={selectedSubject?.Percentage} />
        <AttendanceCalendar
          selectedSubject={selectedSubject}
          data={attendance?.data[0]}
        />
      </DialogContent>
    </Dialog>
  </>
);`,
  },
];

const UIDesignSection = () => (
  <section id="ui" className="space-y-6">
    <div className="flex items-center gap-3">
      <Monitor className="w-6 h-6 text-primary" />
      <h3>Modern UI/UX Design</h3>
    </div>

    <div className="space-y-6">
      {/* Benefits & implementation */}
      <div className="bg-muted/30 p-4 sm:p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">Single-Page Architecture Benefits</h4>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              User Experience Enhancements
            </h5>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <strong>Zero Page Reloads:</strong> All core functions accessible via modals/drawers</li>
              <li>• <strong>Contextual Navigation:</strong> Related actions grouped intelligently</li>
              <li>• <strong>Mobile-First Design:</strong> Optimized for smartphones</li>
              <li>• <strong>Progressive Loading:</strong> Content appears as soon as available</li>
              <li>• <strong>Offline Indicators:</strong> Clear feedback when network is unavailable</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Technical Implementation
            </h5>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <strong>Drawer Components:</strong> Slide-out panels for detailed views</li>
              <li>• <strong>Modal Dialogs:</strong> Focused interactions without navigation</li>
              <li>• <strong>Tab Systems:</strong> Organize related content efficiently</li>
              <li>• <strong>Smart Caching:</strong> Avoid redundant API calls</li>
              <li>• <strong>Error Boundaries:</strong> Graceful failure handling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Component strategy */}
      <div>
        <h4 className="font-semibold mb-4">Component Strategy</h4>
        <div className="w-full max-w-full overflow-x-auto rounded-md">
          <CodeBlock tabs={codeTabs} />
        </div>
      </div>
    </div>
  </section>
);

export default UIDesignSection;
