package api

func (s *Server) ConfigureStaticFiles() {
	s.fiberApp.Static("/", "./console-app")
}
