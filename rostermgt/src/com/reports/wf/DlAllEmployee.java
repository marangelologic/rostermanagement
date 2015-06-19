package com.reports.wf;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

/**
 * Servlet implementation class DlAllEmployee
 */
@WebServlet("/DlAllEmployee")
public class DlAllEmployee extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public DlAllEmployee() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		
		WritableCell cell = null;
		WritableCellFormat cf = null;
		Connection conn = null;

		try {
			conn = DriverManager.getConnection(
					"jdbc:postgresql://10.91.22.235:5432/reporting",
					"postgres", "P0stgres");  

			Statement st = conn.createStatement();

			// st.executeUpdate("EXEC [GetAllVmAndProd]");
			ResultSet allemp = st
					.executeQuery("SELECT emp.*,tm_name,wg.wg_name, emp_psm.psm_name FROM hdpr.tbl_roster_employees emp "
							+ " LEFT OUTER JOIN hdpr.tbl_roster_emp_tm_mapping emp_tm ON emp.emp_id = emp_tm.emp_id"
							+ " INNER JOIN hdpr.tbl_roster_tm_mapping tm ON tm.tm_employee_id = emp_tm.tm_id AND is_current_tm='1' "
							+ " INNER JOIN hdpr.tbl_roster_emp_wg_mapping emp_wg ON emp.emp_id = emp_wg.emp_id AND is_current='1' "
							+ " LEFT OUTER JOIN hdpr.tbl_roster_workgroup_mapping wg ON emp_wg.wg_names = wg.wg_name  "
							+ " INNER JOIN hdpr.tbl_roster_emp_psm_mapping_cc emp_psm ON emp_psm.emp_id = emp.emp_id AND is_current_psm='1'"
							);
			/* VDI = cs.executeQuery(); */

			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition",
					"attachment; filename=All Employees.xls");
			WritableWorkbook w = Workbook.createWorkbook(response
					.getOutputStream());
			WritableSheet s = w.createSheet("all employee Data", 0);
			WritableCellFormat cellFormat = new jxl.write.WritableCellFormat(
					new jxl.write.DateFormat("MM/dd/yyyy hh:mm"));

			int counter = 1;
			s.addCell(new Label(0, 0, "Employee ID"));
			s.addCell(new Label(1, 0, "Employee Name"));
			s.addCell(new Label(2, 0, "Position"));
			s.addCell(new Label(3, 0, "Email"));    
			s.addCell(new Label(4, 0, "Location"));
			s.addCell(new Label(5, 0, "Status"));

			s.addCell(new Label(6, 0, "Date Hired"));
			s.addCell(new Label(7, 0, "Center"));
			s.addCell(new Label(8, 0, "TM Name"));
			s.addCell(new Label(9, 0, "Workgroup Name"));
			s.addCell(new Label(10, 0, "PSM"));

			while (allemp.next()) {
				s.addCell(new Label(0, counter, allemp.getString("emp_id")));
				s.addCell(new Label(1, counter, allemp.getString("emp_name")));
				s.addCell(new Label(2, counter, allemp.getString("role")));
				s.addCell(new Label(3, counter, allemp.getString("email")));
				s.addCell(new Label(4, counter, allemp
						.getString("emp_location")));
				s.addCell(new Label(5, counter, allemp.getString("emp_status")));

				s.addCell(new Label(6, counter, allemp
						.getString("emp_hired_date")));
				s.addCell(new Label(7, counter, allemp.getString("emp_center")));
				s.addCell(new Label(8, counter, allemp.getString("tm_name")));
				s.addCell(new Label(9, counter, allemp.getString("wg_name")));
				s.addCell(new Label(10, counter, ReturnPSM(allemp.getString("emp_center"),allemp.getString("psm_name"))));   
				counter++;
			}

			w.write();
			w.close();
		} catch (NullPointerException g) {

		} catch (WriteException ex) {
			Logger.getLogger(DlAllEmployee.class.getName()).log(Level.SEVERE,
					null, ex);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException ex) {
				Logger.getLogger(DlAllEmployee.class.getName()).log(
						Level.SEVERE, null, ex);
			}
		}
	}
	
	private String ReturnPSM(String location,String PSM){
		String currentPSM = PSM;
		if(location.equals("India")){
			currentPSM = "Adarsh Gaur";
		}
		return currentPSM;
	}

}
